import React, { Component } from 'react'

import * as faceapi from 'face-api.js'

import ImageGallery from '../components/ImageGallery'
import MdlBusyBar from '../components/MdlBusyBar'

import './Sensor.css'

export default class Sensor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isBusy: false,
      imageFile: [],
      imageWidth: 100,
      imageHeight: 100,
      imageSize: 1000000,
      imageFaceDesc: [],
      mtcnnParams: { minFaceSize: 50 }
    }
    // this.fdnet = new faceapi.Mtcnn()
    // this.flnet = new faceapi.FaceLandmarkNet()
    // this.frnet = new faceapi.FaceRecognitionNet()
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleTrain = this.handleTrain.bind(this)
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
  // DNN model functions
  // ================================================================================

  modelLoad = () => {
    return new Promise(async resolve => {
      await faceapi.loadMtcnnModel('/models/mtcnn_model-weights_manifest.json')
      await faceapi.loadFaceRecognitionModel(
        '/models/face_recognition_model-weights_manifest.json'
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

    if (data.length > 0) {
      this.setState({
        imageFile: data
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
    this.setState({ isBusy: true, imageFaceDesc: [] })
    this.faceDesc = []
    await this.modelTrain()
    this.setState({ isBusy: false, imageFaceDesc: this.faceDesc })
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
          onClick={this.handleClear}
        >
          Clear Image
        </button>
        <button
          className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
          onClick={this.handleTrain}
        >
          Train Network
        </button>
      </div>
    )
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col" />
          <div className="layout-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--4-col">
            <MdlBusyBar modelText={'Loading...'} />
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
            <MdlBusyBar
              modelSwitch={this.state.isBusy}
              modelText={'Processing...'}
              modelBorderUp
            />
          </div>
          <div className="layout-content mdl-color--white mdl-shadow--4dp mdl-color-text--grey-800 mdl-cell mdl-cell--6-col" />
        </div>
      )
    }
  }
}
