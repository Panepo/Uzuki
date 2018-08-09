import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImageGallery from './ImageGallery'
import MdlBusyBar from './MdlBusyBar'
import './ImageUploader.css'

export default class ImageUploaderM extends Component {
  constructor(props) {
    super(props)
    this.state = { file: [], isLoading: true, isBusy: false }
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleTrain = this.handleTrain.bind(this)
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ isLoading: false }), 5000)
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.serverTick !== nextProps.serverTick) {
      this.setState({ isBusy: false })
    }
  }

  handleUpload = event => {
    const { modelId, propFunc, imageSize } = this.props
    const data = []
    let dataTemp

    for (let i = 0; i < event.target.files.length; i += 1) {
      if (
        event.target.files[i] != null &&
        event.target.files[i].size <= imageSize
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
        file: data
      })
    } else {
      propFunc(modelId, false, 0)
      this.setState({
        file: []
      })
    }
  }

  handleClear = () => {
    const { modelId, propFunc } = this.props
    propFunc(modelId, false, 0)
    this.setState({
      file: []
    })
  }

  handleTrain = () => {
    const { modelId, propFunc } = this.props
    if (this.state.file.length > 0) {
      this.setState({
        isBusy: true
      })
      setTimeout(() => propFunc(modelId, true, this.state.file.length), 1000)
    }
  }

  render() {
    const { modelId, imageWidth, imageHeight } = this.props

    if (this.state.isLoading) {
      return <MdlBusyBar modelText={'Loading...'} />
    } else {
      return (
        <div>
          <div className="imageUploader">
            <label className="imageUploader_Button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
              Select Image
              <input
                className="imageUploader_none"
                type="file"
                onChange={this.handleUpload}
                required
                multiple
              />
            </label>
            <button
              className="imageUploader_Button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleClear}
            >
              Clear Image
            </button>
            <button
              className="imageUploader_Button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleTrain}
            >
              Train Network
            </button>
          </div>
          <div className="mdl-card__actions mdl-card--border imageUploader_border" />
          <ImageGallery
            modelId={modelId}
            modelClass={'imageUploader_gallery'}
            imageSrc={this.state.file}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
          <MdlBusyBar
            modelSwitch={this.state.isBusy}
            modelText={'Processing...'}
            modelBorderUp
          />
        </div>
      )
    }
  }
}

ImageUploaderM.propTypes = {
  modelId: PropTypes.string,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imageSize: PropTypes.number,
  propFunc: PropTypes.func,
  serverTick: PropTypes.number
}

ImageUploaderM.defaultProps = {
  modelId: 'ImageUploader',
  imageWidth: 100,
  imageHeight: 100,
  imageSize: 5000000,
  serverTick: 0
}
