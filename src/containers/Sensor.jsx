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
      imageFile: [],
      imageWidth: 100,
      imageHeight: 100,
      imageSize: 1000000,
      imageFaceDesc: [],
      videoWidth: 640,
      videoHeight: 360,
      videoBuff: null,
      processTime: '0',
      mtcnnParams: { minFaceSize: 50 }
    }
    // this.fdnet = new faceapi.Mtcnn()
    // this.flnet = new faceapi.FaceLandmarkNet()
    // this.frnet = new faceapi.FaceRecognitionNet()
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleTrain = this.handleTrain.bind(this)
    this.handleWebcam = this.handleWebcam.bind(this)
    this.faceDesc = []
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
      await faceapi.allFacesMtcnn(
        document.getElementById('initial_black'),
        this.state.mtcnnParams
      )
      resolve()
    })
  }

  modelTrain = () => {
    return new Promise(async resolve => {
      for (let i = 0; i < this.state.imageFile.length; i += 1) {
        this.faceDesc.push(
          await faceapi.allFacesMtcnn(
            document.getElementById(
              'ImageGallery_imageGallery_hidden_' + i.toString()
            ),
            this.state.mtcnnParams
          )
        )
      }
      resolve()
    })
  }

  modelPredict = input => {
    return new Promise(async resolve => {
      await faceapi.allFacesMtcnn(
        document.getElementById(input),
        this.state.mtcnnParams
      )
      resolve()
    })
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================

  handleUpload = event => {
    const data = []
    let dataTemp
    const tstart = performance.now()

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
        processTime: Math.floor(tend - tstart).toString() + ' ms'
      })
    } else {
      this.setState({
        imageFile: []
      })
    }
  }

  handleClear = () => {
    this.setState({
      imageFile: []
    })
  }

  handleTrain = async () => {
    const tstart = performance.now()
    this.setState({ isBusy: true, imageFaceDesc: [] })
    this.faceDesc = []
    await this.modelTrain()
    const tend = performance.now()
    this.setState({
      isBusy: false,
      imageFaceDesc: this.faceDesc,
      processTime: Math.floor(tend - tstart).toString() + ' ms'
    })
  }

  handleWebcam = () => {
    if (this.state.isPlaying === true) {
      this.setState({ isPlaying: false, videoBuff: null })
    } else {
      this.setState({ isPlaying: true })
    }
  }

  handleCapture = () => {
    this.setState({ videoBuff: this.webcam.getScreenshot() })
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

  renderWebcamPlayer = () => {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    }

    if (this.state.isPlaying) {
      return (
        <div>
          <div>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleWebcam}>
              Webcam Stop
            </button>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleCapture}>
              Capture
            </button>
          </div>
          <div className="mdl-card__actions mdl-card--border sensor_borderline" />
          <div>
            <Webcam
              audio={false}
              width={this.state.videoWidth}
              height={this.state.videoHeight}
              ref={this.setWebcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <img src={this.state.videoBuff} alt={''} />
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <button
              className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleWebcam}>
              Webcam Start
            </button>
          </div>
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
