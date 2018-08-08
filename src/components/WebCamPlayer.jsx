import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Webcam from 'react-webcam'

export default class WebCamPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = { isPlaying: false }
    this.handleControl = this.handleControl.bind(this)
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  handleControl = () => {
    if (this.state.isPlaying === true) {
      this.setState({ isPlaying: false })
    } else {
      this.setState({ isPlaying: true })
    }
  }

  render() {
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
              className="imageUploader_Button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
              onClick={this.handleControl}
            >
              Webcam Stop
            </button>
          </div>
          <div className="mdl-card__actions mdl-card--border imageUploader_border" />
          <div>
            <Webcam
              audio={false}
              height={480}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={640}
              videoConstraints={videoConstraints}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <button
            className="imageUploader_Button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary"
            onClick={this.handleControl}
          >
            Webcam Start
          </button>
        </div>
      )
    }
  }
}
