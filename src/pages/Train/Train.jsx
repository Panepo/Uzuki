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
import IconImport from '@material-ui/icons/Archive'
import IconExport from '@material-ui/icons/Unarchive'
import IconTrain from '@material-ui/icons/Polymer'
import IconClear from '@material-ui/icons/HighlightOff'

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
  processTime: string
}

class Train extends React.Component<ProvidedProps & Props, State> {
  constructor(props: ProvidedProps & Props) {
    super(props)
    this.state = {
      isLoading: true,
      isBusy: false,
      processTime: '0'
    }
  }

  componentDidMount = async () => {
    await faceapi.loadTinyFaceDetectorModel('/models')
    await faceapi.loadFaceLandmarkTinyModel('/models')
    await faceapi.loadFaceRecognitionModel('/models')
    this.setState({ isLoading: false })
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================

  handleTrain = () => {
    this.setState({ isBusy: true }, () => this.FaceTrain())
  }

  handleImport = (event: any) => {
    const files = event.target.files
    if (files.length > 0) {
      let fr = new FileReader()
      fr.onload = e => {
        // this.props.actionsD.dataImport(JSON.parse(e.target.result))
        this.props.actionsI.infoSet({
          onoff: true,
          variant: 'success',
          message: 'Face file imported'
        })
      }
      fr.readAsText(files.item(0))
    }
  }

  handleExport = () => {
    const data =
      'text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(this.props.train.data))
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', 'data:' + data)
    downloadAnchorNode.setAttribute('download', 'faces.json')
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  handleClear = () => {
    this.props.actionsI.infoSet({
      onoff: true,
      variant: 'info',
      message: 'Face file cleared'
    })
    this.props.actionsT.dataClear()
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
      processTime: Math.floor(tend - tstart).toString() + ' ms'
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
    if (this.state.isLoading) {
      return <Loading helmet={true} title={'Face Training | Minazuki'} />
    }

    return (
      <Layout
        helmet={true}
        title={'Face Training | Minazuki'}
        gridNormal={8}
        gridPhone={10}
        content={
          <Card className={this.props.classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Face Training
              </Typography>
              Image List
            </CardContent>
            <CardActions>
              <Tooltip title="Training to get face data">
                <IconButton
                  className={this.props.classes.icon}
                  color="primary"
                  onClick={this.handleTrain}>
                  <IconTrain />
                </IconButton>
              </Tooltip>
              <Tooltip title="Import face data from computer">
                <IconButton
                  className={this.props.classes.icon}
                  component="label"
                  color="primary">
                  <input
                    className={this.props.classes.hidden}
                    type="file"
                    accept="application/json"
                    onChange={this.handleImport}
                  />
                  <IconImport />
                </IconButton>
              </Tooltip>
              {this.props.train.data.length > 0 ? (
                <Tooltip title="Export face data to computer">
                  <IconButton
                    className={this.props.classes.icon}
                    color="primary"
                    onClick={this.handleExport}>
                    <IconExport />
                  </IconButton>
                </Tooltip>
              ) : null}
              {this.props.train.data.length > 0 ? (
                <Tooltip title="Clear the face data of the clinet">
                  <IconButton
                    className={this.props.classes.icon}
                    color="primary"
                    onClick={this.handleClear}>
                    <IconClear />
                  </IconButton>
                </Tooltip>
              ) : null}
              <Tooltip title="To face recognize sensor">
                <Link to="/sensor">
                  <IconButton
                    className={this.props.classes.icon}
                    color="primary">
                    <IconSensor />
                  </IconButton>
                </Link>
              </Tooltip>
            </CardActions>
            <CardContent>
              <TextField label="Process time" value={this.state.processTime} />
              {this.state.isBusy ? (
                <div>
                  <Typography>Training...</Typography>
                  <LinearProgress />
                </div>
              ) : null}
            </CardContent>
          </Card>
        }
      />
    )
  }
}

Train.propTypes = {
  classes: PropTypes.object.isRequired,
  train: PropTypes.object.isRequired
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
