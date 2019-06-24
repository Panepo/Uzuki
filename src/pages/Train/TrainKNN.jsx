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
import * as tf from '@tensorflow/tfjs-core'
import * as knnClassifier from '@tensorflow-models/knn-classifier'
import { loadModel } from '../../helpers/model.helper'
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

class TrainKNN extends React.Component<ProvidedProps & Props, State> {
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
    await loadModel()
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

  handleDataClear = () => {
    this.props.actionsI.infoSet({
      onoff: true,
      variant: 'info',
      message: 'Face file cleared'
    })
    this.props.actionsT.knnClear()
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
    const classifier = knnClassifier.create()

    await Promise.all(
      this.props.train.face.map(async face => {
        const image = await faceapi.fetchImage(face)
        const descriptors = await faceapi.computeFaceDescriptor(image)
        const tensor = tf.tensor(descriptors)
        classifier.addExample(tensor, 'Boss')
      })
    )

    const tend = performance.now()
    this.setState({
      isBusy: false,
      processTime: Math.floor(tend - tstart)
    })
    this.props.actionsT.knnSave(classifier)
    this.props.actionsI.infoSet({
      onoff: true,
      variant: 'success',
      message: 'Training success'
    })
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
      return <Loading helmet={true} title={'Face Training'} />
    }

    return (
      <Layout
        helmet={true}
        title={'Face Training'}
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

TrainKNN.propTypes = {
  classes: PropTypes.object.isRequired,
  train: PropTypes.shape({
    face: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.object),
    knn: PropTypes.any
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
)(withStyles(styles)(TrainKNN))
