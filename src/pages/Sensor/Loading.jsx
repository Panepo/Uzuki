// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import Layout from '../Layout'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'

const imageBlack = require('../../images/black.png')

const styles = (theme: Object) => ({
  paper: {
    borderRadius: '2px',
    paddingTop: '40px',
    paddingBottom: '40px',
    paddingLeft: '40px',
    paddingRight: '40px'
  },
  hidden: {
    display: 'none'
  }
})

type Props = {
  classes: Object
}

const Loading = (props: Props) => {
  return (
    <Layout
      helmet={true}
      title={'Sensor'}
      content={
        <Card className={props.classes.paper}>
          <Typography>Loading...</Typography>
          <LinearProgress />
          <img
            className={props.classes.hidden}
            id="initial_black"
            src={imageBlack}
            alt="initial_black"
          />
        </Card>
      }
    />
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Loading)
