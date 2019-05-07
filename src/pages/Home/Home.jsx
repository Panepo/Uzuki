// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionImage from '../../actions/image.action'
import type { Dispatch } from '../../models'
import type { RouterHistory } from '../../models'
import type { StateImage } from '../../models/image.model'
import type { StateTrain } from '../../models/train.model'
import { withRouter } from 'react-router-dom'
import Layout from '../Layout'
import { withStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardActionArea from '@material-ui/core/CardActionArea'
import IconButton from '@material-ui/core/IconButton'
import IconTrain from '@material-ui/icons/Polymer'
import IconSettings from '@material-ui/icons/Settings'
import IconSensor from '@material-ui/icons/Contacts'
import IconDone from '@material-ui/icons/Done'
import IconImage from '@material-ui/icons/Image'
import lightGreen from '@material-ui/core/colors/lightGreen'

const imageHome = require('../../images/uzukihome.jpg')

const styles = (theme: Object) => ({
  card: {
    minWidth: 275,
    marginBottom: theme.spacing.unit
  },
  icon2: {
    color: lightGreen[500]
  }
})

type ProvidedProps = {
  classes: Object,
  history: RouterHistory
}

type Props = {
  image: StateImage,
  train: StateTrain,
  actionsI: Dispatch
}

class Home extends React.Component<ProvidedProps & Props> {
  handleRedirect = (link: string) => () => {
    this.props.history.push('/' + link)
  }

  toggleImage = (onoff: boolean) => () => {
    this.props.actionsI.imageSwitch(onoff)
  }

  render() {
    return (
      <Layout
        helmet={true}
        title={'Home | Uzuki'}
        gridNormal={10}
        gridPhone={12}
        content={
          <Grid
            container={true}
            className={this.props.classes.grid}
            spacing={16}
            justify="center">
            {this.props.image.switch ? (
              <Grid item={true} xs={8}>
                <Card>
                  <CardActionArea>
                    <img src={imageHome} alt={'Uzuki'} />
                  </CardActionArea>
                </Card>
              </Grid>
            ) : null}
            <Grid item={true} xs={4}>
              <Card className={this.props.classes.card}>
                <CardActionArea onClick={this.handleRedirect('train')}>
                  <CardHeader
                    avatar={
                      <IconButton
                        className={this.props.classes.icon}
                        color="primary">
                        <IconTrain />
                      </IconButton>
                    }
                    title={
                      <Typography gutterBottom variant="h5" component="h2">
                        Train
                      </Typography>
                    }
                    subheader={
                      'Upload boss picture and train computer to identify boss.'
                    }
                    action={
                      this.props.train.data.length > 0 ? (
                        <IconButton className={this.props.classes.icon2}>
                          <IconDone />
                        </IconButton>
                      ) : null
                    }
                  />
                </CardActionArea>
              </Card>
              <Card className={this.props.classes.card}>
                <CardActionArea onClick={this.handleRedirect('setting')}>
                  <CardHeader
                    avatar={
                      <IconButton
                        className={this.props.classes.icon}
                        color="primary">
                        <IconSettings />
                      </IconButton>
                    }
                    title={
                      <Typography gutterBottom variant="h5" component="h2">
                        Setting
                      </Typography>
                    }
                    subheader={
                      'Configure your camera to fetch the best vision.'
                    }
                  />
                </CardActionArea>
              </Card>
              {this.props.train.data.length > 0 ? (
                <Card className={this.props.classes.card}>
                  <CardActionArea onClick={this.handleRedirect('sensor')}>
                    <CardHeader
                      avatar={
                        <IconButton
                          className={this.props.classes.icon}
                          color="primary">
                          <IconSensor />
                        </IconButton>
                      }
                      title={
                        <Typography gutterBottom variant="h5" component="h2">
                          Sensor
                        </Typography>
                      }
                      subheader={
                        'Start the sensor to detect if your boss is approaching.'
                      }
                    />
                  </CardActionArea>
                </Card>
              ) : null}
              <Card className={this.props.classes.card}>
                {this.props.image.switch ? (
                  <CardActionArea onClick={this.toggleImage(false)}>
                    <CardHeader
                      avatar={
                        <IconButton
                          className={this.props.classes.icon}
                          color="primary">
                          <IconImage />
                        </IconButton>
                      }
                      title={
                        <Typography gutterBottom variant="h5" component="h2">
                          Image
                        </Typography>
                      }
                      subheader={'Toggle Uzuki images.'}
                      action={
                        <IconButton className={this.props.classes.icon2}>
                          <IconDone />
                        </IconButton>
                      }
                    />
                  </CardActionArea>
                ) : (
                  <CardActionArea onClick={this.toggleImage(true)}>
                    <CardHeader
                      avatar={
                        <IconButton
                          className={this.props.classes.icon}
                          color="primary">
                          <IconImage />
                        </IconButton>
                      }
                      title={
                        <Typography gutterBottom variant="h5" component="h2">
                          Image
                        </Typography>
                      }
                      subheader={'Toggle Uzuki images.'}
                    />
                  </CardActionArea>
                )}
              </Card>
            </Grid>
          </Grid>
        }
      />
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    image: state.image,
    train: state.train
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actionsI: bindActionCreators(actionImage, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Home)))
