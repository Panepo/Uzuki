// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import Webcam, { audioConstraintType, videoConstraintType } from './Webcam'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: Object) => ({
  hidden: {
    display: 'none'
  }
})

type ProvidedProps = {
  classes: Object
}

type Props = {
  classes: Object,
  cropx: number,
  cropy: number,
  cropwidth: number,
  cropheight: number,
  audio: boolean,
  videoWidth: number,
  videoHeight: number,
  tickRender: number,
  idVideo: string,
  idCanvas: string,
  audioConstraints: Object,
  videoConstraints: Object
}

class WebcamCrop extends React.Component<ProvidedProps & Props> {
  static propTypes = {
    idVideo: PropTypes.string,
    idCanvas: PropTypes.string,
    classes: PropTypes.object.isRequired,
    videoWidth: PropTypes.number.isRequired,
    videoHeight: PropTypes.number.isRequired,
    tickRender: PropTypes.number.isRequired,
    audio: PropTypes.bool.isRequired,
    cropx: PropTypes.number.isRequired,
    cropy: PropTypes.number.isRequired,
    cropwidth: PropTypes.number.isRequired,
    cropheight: PropTypes.number.isRequired,
    audioConstraints: audioConstraintType,
    videoConstraints: videoConstraintType
  }

  static defaultProps = {
    idVideo: 'react-webcam-crop',
    idCanvas: 'react-webcam-crop-canvas',
    videoWidth: 640,
    videoHeight: 360,
    tickRender: 100,
    audio: false,
    cropx: 0,
    cropy: 0,
    cropwidth: 640,
    cropheight: 360
  }
  interval: number = 0
  webcam: HTMLVideoElement | null

  componentDidMount() {
    this.interval = window.setInterval(
      () => this.handleRender(),
      this.props.tickRender
    )
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  handleRender = () => {
    const video = document.getElementById(this.props.idVideo)
    const canvas = document.getElementById(this.props.idCanvas)

    if (
      canvas instanceof HTMLCanvasElement &&
      video instanceof HTMLVideoElement
    ) {
      const ctx = canvas.getContext('2d')
      const mulX = Math.round(this.props.videoConstraints.width / 640)
      const mulY = Math.round(this.props.videoConstraints.height / 360)
      ctx.drawImage(
        video,
        this.props.cropx * mulX,
        this.props.cropy * mulY,
        this.props.cropwidth * mulX,
        this.props.cropheight * mulY,
        0,
        0,
        this.props.videoWidth,
        this.props.videoHeight
      )
    }
  }

  render() {
    return (
      <div>
        <Webcam
          className={this.props.classes.hidden}
          id={this.props.idVideo}
          audio={this.props.audio}
          width={1280}
          height={720}
          ref={node => (this.webcam = node)}
          videoConstraints={this.props.videoConstraints}
          audioConstraints={this.props.audioConstraints}
        />
        <canvas
          id={this.props.idCanvas}
          width={this.props.videoWidth}
          height={this.props.videoHeight}
        />
      </div>
    )
  }
}

export default withStyles(styles)(WebcamCrop)
