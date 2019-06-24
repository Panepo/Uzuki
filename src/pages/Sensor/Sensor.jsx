// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionInfo from '../../actions/info.action'
import type { Dispatch, RouterHistory } from '../../models'
import type { StateSetting } from '../../models/setting.model'
import type { StateTrain } from '../../models/train.model'
import type { StateImage } from '../../models/image.model'
import { withRouter } from 'react-router-dom'
import * as faceapi from 'face-api.js'
import { createFaceMatcher, faceEncode } from '../../helpers/face.helper'
import { loadModel } from '../../helpers/model.helper'
import Layout from '../Layout'
import { Link } from 'react-router-dom'
import WebcamCrop from '../../componments/WebcamCrop'
import { withStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconCamera from '@material-ui/icons/Camera'
import IconSettings from '@material-ui/icons/Settings'
import IconSensor from '@material-ui/icons/Contacts'
import IconDetect from '@material-ui/icons/RecordVoiceOver'
import IconCover from '@material-ui/icons/BrightnessHigh'

import NotReady from './NotReady'
import Loading from './Loading'
import DialogCover from './DialogCover'

const imageSensor = require('../../images/sensor.jpg')
// const imageSensoru = require('../../images/uzukisensor.jpg')
const imageSensoru = require('../../images/uzuki404.jpg')

const styles = (theme: Object) => ({
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
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
  classes: Object,
  history: RouterHistory
}

type Props = {
  train: StateTrain,
  setting: StateSetting,
  image: StateImage,
  actionsI: Dispatch
}

type State = {
  isLoading: boolean,
  isPlaying: boolean,
  isSensing: boolean,
  isDetecting: boolean,
  processTime: number,
  dialog: {
    cover: boolean
  }
}

class Sensor extends React.Component<ProvidedProps & Props, State> {
  state = {
    isLoading: true,
    isPlaying: false,
    isSensing: false,
    isDetecting: false,
    processTime: 0,
    dialog: {
      cover: false
    }
  }
  interval: number = 0
  tick: number = 0
  faceMatcher = null
  faceOption = {
    expressionsEnabled: false,
    landmarksEnabled: true,
    descriptorsEnabled: true
  }

  componentDidMount = async () => {
    if (this.props.train.data.length > 0) {
      await loadModel()
      const image = document.getElementById('initial_black')
      if (image instanceof HTMLCanvasElement) {
        await faceEncode(image, this.faceOption)
      }
      this.setState({ isLoading: false })
      this.classifier = this.props.train.knn
    }
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================
  toggleDialog = (target: string, onoff: boolean) => () => {
    this.setState({
      dialog: { ...this.state.dialog, [target]: onoff }
    })
  }

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
          this.props.setting.rect.width * 2,
          this.props.setting.rect.height * 2
        )
      }
      this.setState({
        isSensing: false
      })
    } else {
      this.faceMatcher = await createFaceMatcher(this.props.train.data)
      this.interval = window.setInterval(async () => await this.faceMain(), 10)
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
      await this.faceRecognize(canvas, image)
      const tend = performance.now()
      const tickProcess = Math.floor(tend - this.tick).toString() + ' ms'
      const anchor = { x: 0, y: this.props.setting.rect.height * 2 }
      const drawOptions = {
        anchorPosition: 'TOP_LEFT',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontColor: 'yellow'
      }
      const drawBox = new faceapi.draw.DrawTextField(
        tickProcess,
        anchor,
        drawOptions
      )
      drawBox.draw(canvas)
      this.tick = tend
    }
  }

  faceRecognize = async (
    canvas: HTMLCanvasElement,
    image: HTMLCanvasElement
  ) => {
    const results = await faceEncode(image, this.faceOption)

    if (results) {
      faceapi.matchDimensions(canvas, image)
      const resizedResults = faceapi.resizeResults(results, image)
      resizedResults.forEach(({ detection, descriptor }) => {
        // $flow-disable-line
        const label = this.faceMatcher.findBestMatch(descriptor).toString()
        const options = { label }
        const drawBox = new faceapi.draw.DrawBox(detection.box, options)
        drawBox.draw(canvas)

        if (this.state.isDetecting) {
          const labelSplit = label.split(' ')
          if (labelSplit[0] === 'Boss') {
            this.setState({
              isPlaying: false,
              isSensing: false,
              isDetecting: false,
              dialog: {
                cover: true
              }
            })
          }
        }
      })
    } else {
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
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
      <Tooltip title="Detect stop">
        <IconButton
          className={this.props.classes.icon}
          onClick={this.handleDetect}
          color="secondary">
          <IconDetect />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Detect start">
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
        <Tooltip title="Start non-sense generator">
          <IconButton
            className={this.props.classes.icon}
            onClick={this.toggleDialog('cover', true)}
            color="primary">
            <IconCover />
          </IconButton>
        </Tooltip>
      </CardActions>
    )
  }

  renderWebCam = () => {
    const { setting } = this.props

    if (this.state.isPlaying) {
      return (
        <div className={this.props.classes.webcamContainer}>
          <WebcamCrop
            className={this.props.classes.webcam}
            audio={false}
            idCanvas={'sensor_webcamcrop'}
            videoWidth={setting.rect.width * 2}
            videoHeight={setting.rect.height * 2}
            videoConstraints={setting.video}
            cropx={setting.rect.x}
            cropy={setting.rect.y}
            cropwidth={setting.rect.width}
            cropheight={setting.rect.height}
          />
          <canvas
            className={this.props.classes.webcamOverlay}
            id={'sensor_webcamcrop_overlay'}
            width={setting.rect.width * 2}
            height={setting.rect.height * 2}
          />
        </div>
      )
    } else {
      return this.props.image.switch ? (
        <img src={imageSensoru} alt={'sensor'} width={640} height={480} />
      ) : (
        <img src={imageSensor} alt={'sensor'} width={640} height={480} />
      )
    }
  }

  render() {
    if (this.props.train.data.length === 0) return <NotReady />
    if (this.state.isLoading) return <Loading />

    return (
      <Layout
        helmet={true}
        title={'Sensor'}
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
            <DialogCover
              dialogStatus={this.state.dialog.cover}
              toggleDialog={this.toggleDialog}
            />
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
    data: PropTypes.arrayOf(PropTypes.object),
    knn: PropTypes.any
  }).isRequired
}

const mapStateToProps = state => {
  return {
    train: state.train,
    setting: state.setting,
    image: state.image
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
)(withStyles(styles)(withRouter(Sensor)))
