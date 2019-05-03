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
  rect: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  rectLine: number,
  rectColor: string,
  audio: boolean,
  videoWidth: number,
  videoHeight: number,
  tickRender: number,
  idVideo: string,
  idCanvas: string,
  audioConstraints: Object,
  videoConstraints: Object,
  getPosition: ({ x: number, y: number, width: number, height: number }) => {}
}

type State = {
  isDrawing: boolean,
  isDisplaying: boolean,
  startx: number,
  starty: number,
  endx: number,
  endy: number
}

class WebcamRectDraw extends React.Component<ProvidedProps & Props, State> {
  state = {
    isDrawing: false,
    isDisplaying: this.props.rect ? true : false,
    startx: this.props.rect ? this.props.rect.x : 0,
    starty: this.props.rect ? this.props.rect.y : 0,
    endx: this.props.rect ? this.props.rect.x + this.props.rect.width : 0,
    endy: this.props.rect ? this.props.rect.y + this.props.rect.height : 0
  }

  static propTypes = {
    idVideo: PropTypes.string,
    idCanvas: PropTypes.string,
    classes: PropTypes.object.isRequired,
    videoWidth: PropTypes.number.isRequired,
    videoHeight: PropTypes.number.isRequired,
    tickRender: PropTypes.number.isRequired,
    audio: PropTypes.bool.isRequired,
    rect: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    rectColor: PropTypes.string.isRequired,
    rectLine: PropTypes.number.isRequired,
    audioConstraints: audioConstraintType,
    videoConstraints: videoConstraintType,
    getPosition: PropTypes.func
  }

  static defaultProps = {
    idVideo: 'react-webcam-rect',
    idCanvas: 'react-webcam-rect-canvas',
    videoWidth: 640,
    videoHeight: 360,
    tickRender: 100,
    audio: false,
    rectx: 0,
    recty: 0,
    rectwidth: 640,
    rectheight: 360,
    rectColor: 'yellow',
    rectLine: 4
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

  componentWillReceiveProps(nextProps: ProvidedProps & Props) {
    this.setState({
      isDisplaying: true,
      startx: nextProps.rect.x,
      starty: nextProps.rect.y,
      endx: nextProps.rect.x + nextProps.rect.width,
      endy: nextProps.rect.y + nextProps.rect.height
    })
  }

  handleRender = () => {
    const video = document.getElementById(this.props.idVideo)
    const canvas = document.getElementById(this.props.idCanvas)

    if (
      canvas instanceof HTMLCanvasElement &&
      video instanceof HTMLVideoElement
    ) {
      canvas.width = this.props.videoWidth
      const ctx = canvas.getContext('2d')
      ctx.drawImage(
        video,
        0,
        0,
        this.props.videoConstraints.width,
        this.props.videoConstraints.height,
        0,
        0,
        this.props.videoWidth,
        this.props.videoHeight
      )
      if (this.state.isDisplaying) {
        ctx.strokeStyle = this.props.rectColor
        ctx.lineWidth = this.state.isDrawing
          ? Math.round(this.props.rectLine / 2)
          : this.props.rectLine

        const { startx, starty, endx, endy } = this.state

        ctx.strokeRect(
          startx > endx ? endx : startx,
          starty > endy ? endy : starty,
          Math.abs(startx - endx),
          Math.abs(starty - endy)
        )
      }
    }
  }

  handleMouseDown = event => {
    const canvas = document.getElementById(this.props.idCanvas)
    if (canvas instanceof HTMLCanvasElement) {
      const rect = canvas.getBoundingClientRect()
      const posx = event.clientX - rect.left
      const posy = event.clientY - rect.top
      this.setState({
        isDisplaying: true,
        isDrawing: true,
        startx: posx,
        starty: posy,
        endx: posx,
        endy: posy
      })
    }
  }

  handleMouseUp = () => {
    this.setState({ isDrawing: false })
    this.handleGetPosition()
  }

  handleMouseMove = event => {
    if (this.state.isDrawing) {
      const canvas = document.getElementById(this.props.idCanvas)
      if (canvas instanceof HTMLCanvasElement) {
        const rect = canvas.getBoundingClientRect()
        this.setState({
          endx: event.clientX - rect.left,
          endy: event.clientY - rect.top
        })
      }
    }
  }

  handleMouseOut = () => {
    if (this.state.isDrawing) {
      this.setState({
        isDrawing: false,
        isDisplaying: false
      })
    }
  }

  handleGetPosition = () => {
    const { startx, starty, endx, endy } = this.state
    const rect = {
      x: Math.round(startx > endx ? endx : startx),
      y: Math.round(starty > endy ? endy : starty),
      width: Math.abs(startx - endx),
      height: Math.abs(starty - endy)
    }
    this.props.getPosition(rect)
  }

  render() {
    return (
      <div>
        <Webcam
          className={this.props.classes.hidden}
          id={this.props.idVideo}
          audio={this.props.audio}
          width={this.props.videoWidth}
          height={this.props.videoHeight}
          ref={node => (this.webcam = node)}
          videoConstraints={this.props.videoConstraints}
          audioConstraints={this.props.audioConstraints}
        />
        <canvas
          id={this.props.idCanvas}
          width={this.props.videoWidth}
          height={this.props.videoHeight}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
        />
      </div>
    )
  }
}

export default withStyles(styles)(WebcamRectDraw)
