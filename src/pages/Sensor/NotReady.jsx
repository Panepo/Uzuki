// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import type { StateImage } from '../../models/image.model'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Layout from '../Layout'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import IconTrain from '@material-ui/icons/Polymer'
import IconSettings from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const imageNotReady = require('../../images/notready.jpg')
// const imageNotReadyu = require('../../images/uzukinotready.jpg')
const imageNotReadyu = require('../../images/uzuki404.jpg')

const styles = (theme: Object) => ({})

type ProvidedProps = {
  classes: Object
}

type Props = {
  image: StateImage
}

class NotReady extends React.Component<ProvidedProps & Props> {
  render() {
    return (
      <Layout
        helmet={true}
        title={'Sensor | Uzuki'}
        content={
          <Card className={this.props.classes.paper}>
            {this.props.image.switch ? (
              <img
                src={imageNotReadyu}
                alt={'Not Ready'}
                width={640}
                height={480}
              />
            ) : (
              <img
                src={imageNotReady}
                alt={'Not Ready'}
                width={640}
                height={480}
              />
            )}
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Uzuki
              </Typography>
              <Typography component="p">
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
}

NotReady.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    image: state.image
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NotReady))
