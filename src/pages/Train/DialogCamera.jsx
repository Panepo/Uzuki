// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import type { Dispatch } from '../../models'
import type { StateSetting } from '../../models/setting.model'
import type { StateImage } from '../../models/image.model'
import * as actionTrain from '../../actions/train.action'
import * as actionInfo from '../../actions/info.action'
import { Link } from 'react-router-dom'
import WebcamCrop from '../../componments/WebcamCrop'
import { extractData } from '../../helpers/face.helper'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconCamera from '@material-ui/icons/Camera'
import IconCapture from '@material-ui/icons/CameraAlt'
import IconUpload from '@material-ui/icons/CloudUpload'
import IconCancel from '@material-ui/icons/Cancel'
import IconSettings from '@material-ui/icons/Settings'

const imageCamera = require('../../images/camera.jpg')
// const imageCamerau = require('../../images/uzukicamera.jpg')
const imageCamerau = require('../../images/uzuki404.jpg')

const styles = (theme: Object) => ({})

type ProvidedProps = {
  classes: Object
}

type Props = {
  actionsI: Dispatch,
  actionsT: Dispatch,
  dialogStatus: Boolean,
  setting: StateSetting,
  image: StateImage,
  toggleDialog: (target: string, onoff: boolean, key: number) => () => null
}

type State = {
  isPlaying: boolean,
  isCaptured: boolean,
  imageBuff: ImageData | null
}

class DialogCamera extends React.Component<ProvidedProps & Props, State> {
  state = {
    isPlaying: false,
    isCaptured: false,
    imageBuff: null
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================
  handleWebcam = () => {
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false
      })
    } else {
      this.setState({
        isPlaying: true,
        isCaptured: false,
        imageBuff: null
      })
    }
  }

  handleCapture = () => {
    const { setting } = this.props
    const rect = {
      x: 0,
      y: 0,
      width: setting.rect.width * 2,
      height: setting.rect.height * 2
    }
    this.setState(
      {
        isPlaying: false,
        isCaptured: true,
        imageBuff: extractData('face_camera', rect)
      },
      () => this.postCapture()
    )
  }

  postCapture = () => {
    const canvas = document.getElementById('face_camera_screenshot')
    if (
      canvas instanceof HTMLCanvasElement &&
      this.state.imageBuff instanceof ImageData
    ) {
      const ctx = canvas.getContext('2d')
      // $flow-disable-line
      ctx.putImageData(this.state.imageBuff, 0, 0)
    }
  }

  handleExited = () => {
    this.setState({
      isPlaying: false,
      isCaptured: false,
      imageBuff: null
    })
  }

  handleAccept = () => {
    if (this.state.isCaptured) {
      const canvas = document.getElementById('face_camera_screenshot')
      if (canvas instanceof HTMLCanvasElement) {
        const content = canvas.toDataURL('image/jpeg')
        this.props.actionsT.faceAdd([content])
        this.setState({
          isPlaying: true,
          isCaptured: false,
          imageBuff: null
        })
      }
    } else {
      this.props.actionsI.infoSet({
        onoff: true,
        variant: 'error',
        message: 'Start webcam and capture an image first.'
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

    return (
      <DialogActions>
        {renderWebcamPower}
        {this.state.isPlaying ? (
          <Tooltip title="Take a screenshot">
            <IconButton
              className={this.props.classes.icon}
              onClick={this.handleCapture}
              color="primary">
              <IconCapture />
            </IconButton>
          </Tooltip>
        ) : null}
        {this.state.isCaptured ? (
          <Tooltip title="Upload Image">
            <IconButton
              className={this.props.classes.icon}
              onClick={this.handleAccept}
              color="primary">
              <IconUpload />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="Camera settings">
          <Link to="/setting">
            <IconButton className={this.props.classes.icon} color="primary">
              <IconSettings />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Close">
          <IconButton
            className={this.props.classes.icon}
            onClick={this.props.toggleDialog('camera', false, 0)}
            color="secondary">
            <IconCancel />
          </IconButton>
        </Tooltip>
      </DialogActions>
    )
  }

  renderWebCam = () => {
    const { setting } = this.props

    if (this.state.isPlaying) {
      return (
        <WebcamCrop
          className={this.props.classes.webcam}
          audio={false}
          idCanvas={'face_camera'}
          videoWidth={setting.rect.width * 2}
          videoHeight={setting.rect.height * 2}
          videoConstraints={setting.video}
          cropx={setting.rect.x}
          cropy={setting.rect.y}
          cropwidth={setting.rect.width}
          cropheight={setting.rect.height}
        />
      )
    } else if (this.state.isCaptured) {
      return (
        <canvas
          className={this.props.classes.webcam}
          id={'face_camera_screenshot'}
          width={setting.rect.width * 2}
          height={setting.rect.height * 2}
        />
      )
    } else {
      return this.props.image.switch ? (
        <img src={imageCamerau} alt={'camera'} width={640} height={480} />
      ) : (
        <img src={imageCamera} alt={'camera'} width={640} height={480} />
      )
    }
  }

  render() {
    return (
      <Dialog
        open={this.props.dialogStatus}
        onClose={this.props.toggleDialog('camera', false, 0)}
        onExited={this.handleExited}
        aria-labelledby="select-dialog-title"
        aria-describedby="select-dialog-description"
        maxWidth={'xl'}>
        <DialogTitle id="select-dialog-title">Camera</DialogTitle>
        <DialogContent>{this.renderWebCam()}</DialogContent>
        {this.renderButton()}
      </Dialog>
    )
  }
}

DialogCamera.propTypes = {
  classes: PropTypes.object.isRequired,
  dialogStatus: PropTypes.bool.isRequired,
  toggleDialog: PropTypes.func.isRequired,
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
  })
}

const mapStateToProps = state => {
  return {
    setting: state.setting,
    image: state.image
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionsT: bindActionCreators(actionTrain, dispatch),
    actionsI: bindActionCreators(actionInfo, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DialogCamera))
