// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionInfo from '../../actions/actionInfo'
import type { Dispatch } from '../../models'
import type { StateSetting } from '../../models/modelSetting'
import type { StateTrain } from '../../models/train.model'
import * as faceapi from 'face-api.js'
import { createFaceMatcher } from '../../helpers/faceMatch.helper'
import { resizeCanvasAndResults, drawFPS } from '../../helpers/face.helper'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import WebcamCrop from '../../componments/WebcamCrop'
import { withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconCamera from '@material-ui/icons/Camera'
import IconSettings from '@material-ui/icons/Settings'
import IconSensor from '@material-ui/icons/Contacts'
import IconDetect from '@material-ui/icons/RecordVoiceOver'
import IconTrain from '@material-ui/icons/Polymer'

const imageSensor = require('../../images/404.jpg')
const imageBlack = require('../../images/black.png')

const styles = (theme: Object) => ({
  paper: {
    borderRadius: '2px',
    paddingTop: '40px',
    paddingBottom: '40px',
    paddingLeft: '40px',
    paddingRight: '40px'
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  hidden: {
    display: 'none'
  },
  webcamContainer: {
    position: 'relative'
  },
  webcam: {
    position: 'absolute',
    top: '0px',
    left: '0px'
  },
  webcamOverlay: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    zIndex: 10
  }
})

type ProvidedProps = {
  classes: Object
}

type Props = {
  train: StateTrain,
  setting: StateSetting,
  actionsI: Dispatch
}

type State = {
  isLoading: boolean,
  isPlaying: boolean,
  isSensing: boolean,
  isDetecting: boolean,
  processTime: number,
  detectThreshold: number,
  detectSize: number
}
class Sensor extends React.Component<ProvidedProps & Props, State> {
  state = {
    isLoading: true,
    isPlaying: false,
    isSensing: false,
    isDetecting: false,
    processTime: 0,
    detectThreshold: 50,
    detectSize: 160
  }
  interval: number = 0
  faceMatcher = null

  componentDidMount = async () => {
    if (this.props.train.data.length > 0) {
      await faceapi.loadTinyFaceDetectorModel('/models')
      await faceapi.loadFaceLandmarkTinyModel('/models')
      await faceapi.loadFaceRecognitionModel('/models')
      const initial = document.getElementById('initial_black')
      await faceapi
        .detectAllFaces(
          initial,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: this.state.detectSize,
            scoreThreshold: this.state.detectThreshold / 100
          })
        )
        .withFaceLandmarks(true)
        .withFaceDescriptors()

      this.setState({ isLoading: false })
    }
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================
  handleWebcam = () => {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false,
        isSensing: false
      })
    } else {
      this.setState({
        isPlaying: true
      })
    }
  }

  handleSense = async () => {
    if (this.state.isSensing) {
      window.clearInterval(this.interval)
      const canvas = document.getElementById('sensor_webcamcrop_overlay')
      if (canvas instanceof HTMLCanvasElement) {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(
          0,
          0,
          this.props.videoSetting.rect.width * 2,
          this.props.videoSetting.rect.height * 2
        )
      }
      this.setState({
        isSensing: false
      })
    } else {
      this.faceMatcher = await createFaceMatcher(this.props.data.data)
      this.interval = await window.setInterval(() => this.faceMain(), 1000)
      this.setState({
        isSensing: true
      })
    }
  }

  handleDetect = () => {
    if (this.state.isDetecting) {
      this.setState({
        isDetecting: false
      })
    } else {
      this.setState({
        isDetecting: true
      })
    }
  }

  // ================================================================================
  // Facec recognition functions
  // ================================================================================
  faceMain = async () => {
    const image = document.getElementById('sensor_webcamcrop')
    const canvas = document.getElementById('sensor_webcamcrop_overlay')
    if (
      canvas instanceof HTMLCanvasElement &&
      image instanceof HTMLCanvasElement
    ) {
      const tstart = performance.now()
      await this.faceRecognize(canvas, image)
      const tend = performance.now()
      const tickProcess = Math.floor(tend - tstart).toString() + ' ms'
      drawFPS(canvas, tickProcess, 'lime', {
        x: 10,
        y: this.props.videoSetting.rect.height * 2 - 10
      })
    }
  }

  faceRecognize = async (
    canvas: HTMLCanvasElement,
    image: HTMLCanvasElement
  ) => {
    const results = await faceapi
      .detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: this.state.detectSize,
          scoreThreshold: this.state.detectThreshold / 100
        })
      )
      .withFaceLandmarks(true)
      .withFaceDescriptors()

    if (results) {
      const resizedResults = resizeCanvasAndResults(image, canvas, results)
      const boxesWithText = await Promise.all(
        resizedResults.map(async ({ detection, descriptor }) => {
          // $flow-disable-line
          const match = this.faceMatcher.findBestMatch(descriptor).toString()

          if (this.state.isDetecting) console.log('FQ')

          return new faceapi.BoxWithText(detection.box, match)
        })
      )

      faceapi.drawDetection(canvas, boxesWithText, {
        boxColor: 'yellow',
        textColor: 'lime'
      })
    }
  }

  // ================================================================================
  // React render functions
  // ================================================================================
  renderButton = () => {
    const renderWebcamPower = this.state.isPlaying ? (
      <Tooltip title="Webcam stop">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleWebcam}
          color="secondary">
          <IconCamera />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Webcam start">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleWebcam}
          color="primary">
          <IconCamera />
        </IconButton>
      </Tooltip>
    )

    const renderRecognize = this.state.isSensing ? (
      <Tooltip title="Recognize stop">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleSense}
          color="secondary">
          <IconSensor />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Recognize start">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleSense}
          color="primary">
          <IconSensor />
        </IconButton>
      </Tooltip>
    )

    const renderDetect = this.state.isDetecting ? (
      <Tooltip title="Record stop">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleDetect}
          color="secondary">
          <IconDetect />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Record start">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleDetect}
          color="primary">
          <IconDetect />
        </IconButton>
      </Tooltip>
    )

    return (
      <CardActions>
        {renderWebcamPower}
        <Tooltip title="Camera settings">
          <Link to="/setting">
            <IconButton className={this.props.classes.icon} color="primary">
              <IconSettings />
            </IconButton>
          </Link>
        </Tooltip>
        {this.state.isPlaying ? renderRecognize : null}
        {this.state.isSensing ? renderDetect : null}
      </CardActions>
    )
  }

  renderWebCam = () => {
    const { videoSetting } = this.props

    if (this.state.isPlaying) {
      return (
        <div className={this.props.classes.webcamContainer}>
          <WebcamCrop
            className={this.props.classes.webcam}
            audio={false}
            idCanvas={'sensor_webcamcrop'}
            videoWidth={videoSetting.rect.width * 2}
            videoHeight={videoSetting.rect.height * 2}
            videoConstraints={videoSetting.video}
            cropx={videoSetting.rect.x}
            cropy={videoSetting.rect.y}
            cropwidth={videoSetting.rect.width}
            cropheight={videoSetting.rect.height}
          />
          <canvas
            className={this.props.classes.webcamOverlay}
            id={'sensor_webcamcrop_overlay'}
            width={videoSetting.rect.width * 2}
            height={videoSetting.rect.height * 2}
          />
        </div>
      )
    } else {
      return <img src={imageSensor} alt={'sensor'} width={640} height={480} />
    }
  }

  render() {
    if (this.props.train.data.length > 0) {
      return (
        <Layout
          helmet={true}
          title={'Sensor | Uzuki'}
          content={
            <Card className={this.props.classes.paper}>
              <CardContent>
                <Typography>
                  Face data not ready, go traininig first...
                </Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Upload boss picture and train computer to identify boss.">
                  <Link to="/train">
                    <IconButton
                      className={this.props.classes.icon}
                      color="primary">
                      <IconTrain />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Configure your camera to fetch the best vision.">
                  <Link to="/setting">
                    <IconButton
                      className={this.props.classes.icon}
                      color="primary">
                      <IconSettings />
                    </IconButton>
                  </Link>
                </Tooltip>
              </CardActions>
            </Card>
          }
        />
      )
    }

    if (this.state.isLoading) {
      return (
        <Layout
          helmet={true}
          title={'Sensor | Uzuki'}
          content={
            <Card className={this.props.classes.paper}>
              <Typography>Loading...</Typography>
              <LinearProgress />
              <img
                className={this.props.classes.hidden}
                id="initial_black"
                src={imageBlack}
                alt="initial_black"
              />
            </Card>
          }
        />
      )
    }

    return (
      <Layout
        helmet={true}
        title={'Sensor | Uzuki'}
        gridNormal={6}
        gridPhone={10}
        content={
          <Card className={this.props.classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Sensor
              </Typography>
              <Divider className={this.props.classes.divider} />
              <Grid
                container={true}
                className={this.props.classes.grid}
                justify="center">
                {this.renderWebCam()}
              </Grid>
              <Divider className={this.props.classes.divider} />
            </CardContent>
            {this.renderButton()}
          </Card>
        }
      />
    )
  }
}

Sensor.propTypes = {
  classes: PropTypes.object.isRequired,
  setting: PropTypes.shape({
    rect: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number
    }),
    video: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  }),
  train: PropTypes.shape({
    face: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

const mapStateToProps = state => {
  return {
    train: state.train,
    setting: state.setting
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionsI: bindActionCreators(actionInfo, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Sensor))
