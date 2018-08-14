import React, { Component } from 'react'

import * as faceapi from 'face-api.js'
import Webcam from 'react-webcam'

import ImageGallery from '../components/ImageGallery'
import MdlBusyBar from '../components/MdlBusyBar'

import './Sensor.css'

export default class Sensor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isBusy: false,
      isPlaying: false,
      isTrained: false,
      isSensing: false,
      imageFile: [],
      imageWidth: 100,
      imageHeight: 100,
      imageSize: 1000000,
      imageFaceDesc: [],
      videoWidth: 640,
      videoHeight: 360,
      videoBuff: null,
      processTime: '0',
      predictTick: 1000,
      mtcnnParams: { minFaceSize: 50 }
    }
    // this.fdnet = new faceapi.Mtcnn()
    // this.flnet = new faceapi.FaceLandmarkNet()
    // this.frnet = new faceapi.FaceRecognitionNet()
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleTrain = this.handleTrain.bind(this)
    this.handleWebcam = this.handleWebcam.bind(this)
    this.faceTrained = []
    this.faceInput = []
  }

  // ================================================================================
  // React lifecycle functions
  // ================================================================================

  componentDidMount = async () => {
    await this.modelLoad()
    this.setState({ isLoading: false })
  }

  // ================================================================================
  // Inner functions
  // ================================================================================

  setWebcamRef = webcam => {
    this.webcam = webcam
  }

  // ================================================================================
  // DNN model functions
  // ================================================================================

  modelLoad = () => {
    return new Promise(async resolve => {
      await faceapi.loadMtcnnModel('/models/mtcnn_model-weights_manifest.json')
      await faceapi.loadFaceRecognitionModel(
        '/models/face_recognition_model-weights_manifest.json'
      )
      await faceapi.allFacesMtcnn(document.getElementById('initial_black'))
      resolve()
    })
  }

  modelTrain = () => {
    return new Promise(async resolve => {
      for (let i = 0; i < this.state.imageFile.length; i += 1) {
        this.faceTrained.push({
          desc: await faceapi.computeFaceDescriptor(
            document.getElementById(
              'ImageGallery_imageGallery_hidden_' + i.toString()
            )
          ),
          id: i.toString()
        })
      }
      resolve()
    })
  }

  modelPredict = input => {
    return new Promise(async resolve => {
      this.faceInput = (await faceapi.allFacesMtcnn(
        document.getElementById(input),
        this.state.mtcnnParams
      )).map(fd => fd.forSize(this.state.videoWidth, this.state.videoHeight))
      resolve()
    })
  }

  modelGetBestMatch = (faceTrained, faceInput) => {
    return faceTrained
      .map(({ desc, id }) => ({
        distance: faceapi.euclideanDistance(desc, faceInput),
        id
      }))
      .reduce((best, curr) => (best.distance < curr.distance ? best : curr))
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================

  handleUpload = event => {
    const data = []
    let dataTemp
    const tstart = performance.now()
    clearInterval(this.interval)

    for (let i = 0; i < event.target.files.length; i += 1) {
      if (
        event.target.files[i] != null &&
        event.target.files[i].size <= this.state.imageSize
      ) {
        if (
          event.target.files[i].type === 'image/jpeg' ||
          event.target.files[i].type === 'image/png' ||
          event.target.files[i].type === 'image/bmp'
        ) {
          dataTemp = URL.createObjectURL(event.target.files[i])
          data.push(dataTemp)
        }
      }
    }

    const tend = performance.now()
    if (data.length > 0) {
      this.setState({
        imageFile: data,
        processTime: Math.floor(tend - tstart).toString() + ' ms',
        isSensing: false
      })
    } else {
      this.setState({
        imageFile: [],
        imageFaceDesc: [],
        isTrained: false,
        isSensing: false
      })
    }
  }

  handleClear = () => {
    clearInterval(this.interval)
    this.setState({
      imageFile: [],
      imageFaceDesc: [],
      isTrained: false,
      isSensing: false
    })
  }

  handleTrain = async () => {
    const tstart = performance.now()
    clearInterval(this.interval)
    this.setState({
      isBusy: true,
      imageFaceDesc: [],
      isTrained: false,
      isSensing: false
    })
    this.faceTrained = []
    await this.modelTrain()
    const tend = performance.now()
    this.setState({
      isBusy: false,
      isTrained: true,
      imageFaceDesc: this.faceTrained,
      processTime: Math.floor(tend - tstart).toString() + ' ms'
    })
  }

  handleWebcam = () => {
    if (this.state.isPlaying) {
      clearInterval(this.interval)
      this.setState({ isPlaying: false, videoBuff: null, isSensing: false })
    } else {
      this.setState({ isPlaying: true })
    }
  }

  handleCapture = () => {
    return new Promise(async resolve => {
      await this.setState({ videoBuff: this.webcam.getScreenshot() })
      resolve()
    })
  }

  handleSense = () => {
    if (this.state.isSensing) {
      clearInterval(this.interval)
      this.setState({ isSensing: false })
    } else {
      this.interval = setInterval(
        () => this.handleModelPredictTick(),
        this.state.predictTick
      )
      this.setState({ isSensing: true })
    }
  }

  handleModelPredictTick = async () => {
    const tstart = performance.now()
    const canvas = this.refs.overlayCanvas
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, this.state.videoWidth, this.state.videoHeight)
    await this.handleCapture()
    await this.modelPredict('sensor_video_capture_id')
    this.faceInput.forEach(({ detection, landmarks, descriptor }) => {
      faceapi.drawDetection('sensor_overlay_id', [detection], {
        withScore: false
      })
      faceapi.drawLandmarks(
        'sensor_overlay_id',
        landmarks.forSize(this.state.videoWidth, this.state.videoHeight),
        { lineWidth: 4, color: 'red' }
      )
      const bestMatch = this.modelGetBestMatch(
        this.state.imageFaceDesc,
        descriptor
      )
      const dispText = bestMatch => {
        if (bestMatch.distance < 0.6) {
          return (
            'unknown_' +
            bestMatch.id +
            ' ' +
            Math.floor(bestMatch.distance * 100).toString() +
            '%'
          )
        } else {
          return (
            'person_' +
            bestMatch.id +
            ' ' +
            Math.floor(bestMatch.distance * 100).toString() +
            '%'
          )
        }
      }
      const { x, y, height: boxHeight } = detection.getBox()
      faceapi.drawText(
        ctx,
        x,
        y + boxHeight,
        dispText(bestMatch),
        Object.assign(faceapi.getDefaultDrawOptions(), {
          color: 'red',
          fontSize: 16
        })
      )
    })
    const tend = performance.now()
    this.setState({
      processTime: Math.floor(tend - tstart).toString() + ' ms'
    })
  }

  // ================================================================================
  // React render functions
  // ================================================================================

  renderButton = () => {
    return (
      <div>
        <label className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
          Select Image
          <input
            className="sensor_button_none"
            type="file"
            onChange={this.handleUpload}
            required
            multiple
          />
        </label>
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
          onClick={this.handleClear}>
          Clear Image
        </button>
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
          onClick={this.handleTrain}>
          Train Network
        </button>
      </div>
    )
  }

  renderProceeTime = () => {
    if (this.state.imageFile.length > 0 && this.state.isBusy === false) {
      return (
        <div>
          <div className="mdl-card__actions mdl-card--border sensor_borderline" />
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input
              className="mdl-textfield__input"
              type="text"
              id="processTime_text"
              readOnly
              value={this.state.processTime}
            />
            <label className="mdl-textfield__label" htmlFor="processTime_text">
              Process Time
            </label>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderWebcamButton = () => {
    const renderWebcamPower = onoff => {
      if (onoff) {
        return (
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
            onClick={this.handleWebcam}>
            Webcam Stop
          </button>
        )
      } else {
        return (
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
            onClick={this.handleWebcam}>
            Webcam Start
          </button>
        )
      }
    }

    const renderWebcamCapture = onoff => {
      if (onoff) {
        return (
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
            onClick={this.handleCapture}>
            Capture
          </button>
        )
      } else {
        return null
      }
    }

    const renderWebcamSense = (onoff1, onoff2) => {
      if (onoff1) {
        if (onoff2) {
          return (
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleSense}>
              Sensing Stop
            </button>
          )
        } else {
          return (
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleSense}>
              Sensing Start
            </button>
          )
        }
      } else {
        return null
      }
    }

    return (
      <div>
        {renderWebcamPower(this.state.isPlaying)}
        {renderWebcamCapture(this.state.isPlaying)}
        {renderWebcamSense(
          this.state.isPlaying & this.state.isTrained,
          this.state.isSensing
        )}
      </div>
    )
  }

  renderWebcamPlayer = () => {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    }

    if (this.state.isPlaying) {
      return (
        <div>
          <div>{this.renderWebcamButton()}</div>
          <div className="mdl-card__actions mdl-card--border sensor_borderline" />
          <div className="sensor_webcam">
            <Webcam
              audio={false}
              width={this.state.videoWidth}
              height={this.state.videoHeight}
              ref={this.setWebcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <div className="sensor_overlay">
            <canvas
              id="sensor_overlay_id"
              ref="overlayCanvas"
              width={this.state.videoWidth}
              height={this.state.videoHeight}
            />
          </div>
          <img
            className="sensor_video_capture"
            id="sensor_video_capture_id"
            src={this.state.videoBuff}
            alt={''}
          />
        </div>
      )
    } else {
      return (
        <div>
          <div>{this.renderWebcamButton()}</div>
          <div className="mdl-card__actions mdl-card--border sensor_borderline" />
        </div>
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col" />
          <div className="layout-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
            <MdlBusyBar modelText={'Loading...'} />
            <img
              className="sensor_initial_black"
              id="initial_black"
              src="black.png"
              alt="initial_black"
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="layout-container mdl-grid">
          <div className="mdl-cell mdl-cell--1-col mdl-cell--hide-tablet mdl-cell--hide-phone" />
          <div className="layout-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
            {this.renderButton()}
            <div className="mdl-card__actions mdl-card--border sensor_borderline" />
            <ImageGallery
              imageSrc={this.state.imageFile}
              imageWidth={this.state.imageWidth}
              imageHeight={this.state.imageHeight}
              renderHidden
            />
            {this.renderProceeTime()}
            <MdlBusyBar
              modelSwitch={this.state.isBusy}
              modelText={'Processing...'}
              modelBorderUp
            />
          </div>
          <div className="layout-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--6-col">
            {this.renderWebcamPlayer()}
          </div>
        </div>
      )
    }
  }
}
