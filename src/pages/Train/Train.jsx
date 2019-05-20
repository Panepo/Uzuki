// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionInfo from '../../actions/info.action'
import * as actionTrain from '../../actions/train.action'
import type { Dispatch } from '../../models'
import type { StateTrain } from '../../models/train.model'
import * as faceapi from 'face-api.js'
import Layout from '../Layout'
import Loading from '../Loading'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import LinearProgress from '@material-ui/core/LinearProgress'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconSensor from '@material-ui/icons/Contacts'
import IconExport from '@material-ui/icons/Archive'
import IconImport from '@material-ui/icons/Unarchive'
import IconTrain from '@material-ui/icons/Polymer'
import IconClear from '@material-ui/icons/HighlightOff'
import IconAdd from '@material-ui/icons/AddPhotoAlternate'
import IconCamera from '@material-ui/icons/Camera'
import IconDelete from '@material-ui/icons/Clear'

// Lazy component
const DialogUpload = React.lazy(() => import('./DialogUpload'))
const DialogDelete = React.lazy(() => import('./DialogDelete'))
const DialogCamera = React.lazy(() => import('./DialogCamera'))
const RenderList = React.lazy(() => import('./RenderList'))

const styles = (theme: Object) => ({
  divider: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  imageList: {
    height: 400
  },
  hidden: {
    display: 'none'
  }
})

type ProvidedProps = {
  classes: Object
}

type Props = {
  train: StateTrain,
  actionsI: Dispatch,
  actionsT: Dispatch
}

type State = {
  isLoading: boolean,
  isBusy: boolean,
  dialog: {
    upload: boolean,
    delete: boolean,
    camera: boolean
  },
  dialogKey: number,
  processTime: number
}

class Train extends React.Component<ProvidedProps & Props, State> {
  state = {
    isLoading: true,
    isBusy: false,
    processTime: 0,
    dialog: {
      upload: false,
      delete: false,
      camera: false
    },
    dialogKey: 0
  }

  componentDidMount = async () => {
    const dev = process.env.NODE_ENV === 'development'
    if (dev) {
      await faceapi.loadTinyFaceDetectorModel('/models')
      await faceapi.loadFaceLandmarkTinyModel('/models')
      await faceapi.loadFaceRecognitionModel('/models')
    } else {
      const url = 'https://panepo.github.io/Uzuki/models'
      await faceapi.loadTinyFaceDetectorModel(url)
      await faceapi.loadFaceLandmarkTinyModel(url)
      await faceapi.loadFaceRecognitionModel(url)
    }
    this.setState({ isLoading: false })
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================
  toggleDialog = (target: string, onoff: boolean, key: number) => () => {
    this.setState({
      dialog: { ...this.state.dialog, [target]: onoff },
      dialogKey: key
    })
  }

  handleAccept = (target: string) => (
    event: SyntheticEvent<HTMLInputElement>
  ) => {
    event.preventDefault()
    switch (target) {
      case 'delete':
        this.props.actionsT.faceRemove(this.state.dialogKey)
        this.setState({
          dialog: { ...this.state.dialog, [target]: false }
        })
        this.props.actionsI.infoSet({
          onoff: true,
          variant: 'success',
          message: 'Image deleted'
        })
        break
      default:
        break
    }
  }

  handleTrain = () => {
    this.setState({ isBusy: true }, () => this.FaceTrain())
  }

  handleDataImport = (event: any) => {
    const files = event.target.files
    if (files.length > 0) {
      let fr = new FileReader()
      fr.onload = e => {
        this.props.actionsT.dateSave(JSON.parse(e.target.result))
        this.props.actionsI.infoSet({
          onoff: true,
          variant: 'success',
          message: 'Face file imported'
        })
      }
      fr.readAsText(files.item(0))
    }
  }

  handleDataExport = () => {
    const data =
      'text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.props.train.data))
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', 'data:' + data)
    downloadAnchorNode.setAttribute('download', 'boss.json')
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  handleDataClear = () => {
    this.props.actionsI.infoSet({
      onoff: true,
      variant: 'info',
      message: 'Face file cleared'
    })
    this.props.actionsT.dataClear()
  }

  handleFaceClear = () => {
    this.props.actionsT.faceClear()
    this.props.actionsI.infoSet({
      onoff: true,
      variant: 'info',
      message: 'Faces cleared'
    })
  }

  // ================================================================================
  // Facec recognition functions
  // ================================================================================
  FaceTrain = async () => {
    const tstart = performance.now()
    const labeledDescriptors = []

    await Promise.all(
      this.props.train.face.map(async face => {
        const descriptors = []
        const image = await faceapi.fetchImage(face)
        descriptors.push(await faceapi.computeFaceDescriptor(image))

        if (descriptors.length > 0) {
          labeledDescriptors.push(
            new faceapi.LabeledFaceDescriptors('Boss', descriptors)
          )
        }
      })
    )

    const tend = performance.now()
    this.setState({
      isBusy: false,
      processTime: Math.floor(tend - tstart)
    })

    if (labeledDescriptors.length > 0) {
      this.props.actionsT.dateSave(labeledDescriptors)
      this.props.actionsI.infoSet({
        onoff: true,
        variant: 'success',
        message: 'Training success'
      })
    } else {
      this.props.actionsI.infoSet({
        onoff: true,
        variant: 'error',
        message: 'Training failed'
      })
    }
  }

  // ================================================================================
  // React render functions
  // ================================================================================

  render() {
    const renderButton = (
      <CardActions>
        <Tooltip title="Add face image from computer">
          <IconButton
            className={this.props.classes.icon}
            component="label"
            color="primary"
            onClick={this.toggleDialog('upload', true, 0)}>
            <IconAdd />
          </IconButton>
        </Tooltip>
        <Tooltip title="Start camera to capture face image">
          <IconButton
            className={this.props.classes.icon}
            component="label"
            color="primary"
            onClick={this.toggleDialog('camera', true, 0)}>
            <IconCamera />
          </IconButton>
        </Tooltip>
        {this.props.train.face.length > 0 ? (
          <Tooltip title="Clear face image">
            <IconButton
              className={this.props.classes.icon}
              component="label"
              color="primary"
              onClick={this.handleFaceClear}>
              <IconDelete />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="Import face data from computer">
          <IconButton
            className={this.props.classes.icon}
            component="label"
            color="primary">
            <input
              className={this.props.classes.hidden}
              type="file"
              accept="application/json"
              onChange={this.handleDataImport}
            />
            <IconImport />
          </IconButton>
        </Tooltip>
        {this.props.train.data.length > 0 ? (
          <Tooltip title="Export face data to computer">
            <IconButton
              className={this.props.classes.icon}
              color="primary"
              onClick={this.handleDataExport}>
              <IconExport />
            </IconButton>
          </Tooltip>
        ) : null}
        {this.props.train.data.length > 0 ? (
          <Tooltip title="Clear the face data of the clinet">
            <IconButton
              className={this.props.classes.icon}
              color="primary"
              onClick={this.handleDataClear}>
              <IconClear />
            </IconButton>
          </Tooltip>
        ) : null}
        {this.props.train.face.length > 0 ? (
          <Tooltip title="Training to get face data">
            <IconButton
              className={this.props.classes.icon}
              color="primary"
              onClick={this.handleTrain}>
              <IconTrain />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip title="To face recognize sensor">
          <Link to="/sensor">
            <IconButton className={this.props.classes.icon} color="primary">
              <IconSensor />
            </IconButton>
          </Link>
        </Tooltip>
      </CardActions>
    )

    if (this.state.isLoading) {
      return <Loading helmet={true} title={'Face Training | Uzuki'} />
    }

    return (
      <Layout
        helmet={true}
        title={'Face Training | Uzuki'}
        gridNormal={8}
        gridPhone={12}
        content={
          <Card className={this.props.classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Face Training
              </Typography>
              <React.Suspense fallback={<Typography>Loading...</Typography>}>
                <RenderList
                  faces={this.props.train.face}
                  toggleDialog={this.toggleDialog}
                />
              </React.Suspense>
            </CardContent>
            {renderButton}
            <CardContent>
              {this.state.processTime > 0 ? (
                <TextField
                  label="Process time"
                  value={this.state.processTime.toString() + ' ms'}
                />
              ) : null}
              {this.state.isBusy ? (
                <div>
                  <Typography>Training...</Typography>
                  <LinearProgress />
                </div>
              ) : null}
            </CardContent>
            <React.Suspense fallback={<Typography>Loading...</Typography>}>
              <DialogDelete
                dialogStatus={this.state.dialog.delete}
                toggleDialog={this.toggleDialog}
                imageSrc={this.props.train.face[this.state.dialogKey]}
                handleAccept={this.handleAccept}
              />
              <DialogUpload
                dialogStatus={this.state.dialog.upload}
                toggleDialog={this.toggleDialog}
              />
              <DialogCamera
                dialogStatus={this.state.dialog.camera}
                toggleDialog={this.toggleDialog}
                handleAccept={this.handleAccept}
              />
            </React.Suspense>
          </Card>
        }
      />
    )
  }
}

Train.propTypes = {
  classes: PropTypes.object.isRequired,
  train: PropTypes.shape({
    face: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
}

const mapStateToProps = state => {
  return {
    train: state.train
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionsI: bindActionCreators(actionInfo, dispatch),
    actionsT: bindActionCreators(actionTrain, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Train))
