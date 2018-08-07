import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import './ImageUploader.css'

export default class ImageUploaderM extends Component {
  constructor(props) {
    super(props)
    this.state = { file: [], isLoading: true }
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ isLoading: false }), 5000)
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
      setTimeout(() => propFunc(modelId, true, data.length), 1000)
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

  renderGallery = () => {
    const { modelId, imageWidth, imageHeight } = this.props
    const output = []
    let outTemp
    let outKeyTemp

    for (let i = 0; i < this.state.file.length; i += 1) {
      outKeyTemp = modelId + '_imageUploader_image_' + i.toString()
      outTemp = (
        <img
          className={'imageUploader_gallery'}
          id={outKeyTemp}
          key={outKeyTemp}
          src={this.state.file[i]}
          width={imageWidth}
          height={imageHeight}
          alt={this.state.text}
        />
      )
      output.push(outTemp)
    }

    return <FlipMove className="flip-wrapper">{output}</FlipMove>
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <span>Loading...</span>
          <div className="mdl-progress mdl-js-progress mdl-progress__indeterminate" />
        </div>
      )
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
          </div>
          <div className="mdl-card__actions mdl-card--border imageUploader_border">
            {this.renderGallery()}
          </div>
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
  propFunc: PropTypes.func
}

ImageUploaderM.defaultProps = {
  modelId: 'ImageUploader',
  imageWidth: 100,
  imageHeight: 100,
  imageSize: 5000000
}
