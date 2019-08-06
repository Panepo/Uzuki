// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionImage from '../../actions/image.action'
import type { Dispatch, RouterHistory } from '../../models'
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
import IconTrain from '@material-ui/icons/Polymer'
import IconSettings from '@material-ui/icons/Settings'
import IconSensor from '@material-ui/icons/Contacts'
import IconDone from '@material-ui/icons/Done'
// import IconImage from '@material-ui/icons/Image'
import lightGreen from '@material-ui/core/colors/lightGreen'

import Github from './Github'

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
    const renderTrain = (
      <Card className={this.props.classes.card}>
        <CardActionArea onClick={this.handleRedirect('train')}>
          <CardHeader
            avatar={<IconTrain color="primary" />}
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
                <IconDone className={this.props.classes.icon2} />
              ) : null
            }
          />
        </CardActionArea>
      </Card>
    )

    const renderSetting = (
      <Card className={this.props.classes.card}>
        <CardActionArea onClick={this.handleRedirect('setting')}>
          <CardHeader
            avatar={<IconSettings color="primary" />}
            title={
              <Typography gutterBottom variant="h5" component="h2">
                Setting
              </Typography>
            }
            subheader={'Configure your camera to fetch the best vision.'}
          />
        </CardActionArea>
      </Card>
    )

    const renderSensor = (
      <Card className={this.props.classes.card}>
        <CardActionArea onClick={this.handleRedirect('sensor')}>
          <CardHeader
            avatar={<IconSensor color="primary" />}
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
    )
/*
    const renderImage = (
      <Card className={this.props.classes.card}>
        <CardActionArea
          onClick={
            this.props.image.switch
              ? this.toggleImage(false)
              : this.toggleImage(true)
          }>
          <CardHeader
            avatar={<IconImage color="primary" />}
            title={
              <Typography gutterBottom variant="h5" component="h2">
                Image
              </Typography>
            }
            subheader={'Toggle Uzuki images.'}
            action={
              this.props.image.switch ? (
                <IconDone className={this.props.classes.icon2} />
              ) : null
            }
          />
        </CardActionArea>
      </Card>
    )

    const renderTrainK = (
      <Card className={this.props.classes.card}>
        <CardActionArea onClick={this.handleRedirect('traink')}>
          <CardHeader
            avatar={<IconTrain color="primary" />}
            title={
              <Typography gutterBottom variant="h5" component="h2">
                Train with KNN
              </Typography>
            }
            subheader={
              'Upload boss picture and train computer to identify boss with KNN classifier.'
            }
            action={
              this.props.train.data.length > 0 ? (
                <IconDone className={this.props.classes.icon2} />
              ) : null
            }
          />
        </CardActionArea>
      </Card>
    )

    const renderSensorK = (
      <Card className={this.props.classes.card}>
        <CardActionArea onClick={this.handleRedirect('sensork')}>
          <CardHeader
            avatar={<IconSensor color="primary" />}
            title={
              <Typography gutterBottom variant="h5" component="h2">
                Sensor with KNN
              </Typography>
            }
            subheader={
              'Start the sensor with KNN classifier to detect if your boss is approaching.'
            }
          />
        </CardActionArea>
      </Card>
    )
*/
    return (
      <Layout
        helmet={true}
        title={'Home'}
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
              {renderSetting}
              {renderTrain}
              {this.props.train.data.length > 0 ? renderSensor : null}
              <Github />
            </Grid>
          </Grid>
        }
      />
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.shape({
    switch: PropTypes.bool
  }).isRequired,
  train: PropTypes.shape({
    face: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    knn: PropTypes.any
  }).isRequired
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
