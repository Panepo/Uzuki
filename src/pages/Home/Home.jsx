// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import type { RouterHistory } from '../../models'
import { withRouter } from 'react-router-dom'
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

const imageHome = require('../../images/home.jpg')

const styles = (theme: Object) => ({
  card: {
    minWidth: 275,
    marginBottom: theme.spacing.unit
  }
})

type ProvidedProps = {
  classes: Object,
  history: RouterHistory
}

type Props = {}

class Home extends React.Component<ProvidedProps & Props> {
  handleRedirect = (link: string) => () => {
    this.props.history.push('/' + link)
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
            <Grid item={true} xs={8}>
              <Card>
                <CardActionArea>
                  <img src={imageHome} alt={'Uzuki'} />
                </CardActionArea>
              </Card>
            </Grid>
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

export default withStyles(styles)(withRouter(Home))
