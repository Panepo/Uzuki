// @flow

import React from 'react'
import PropTypes from 'prop-types'
import Layout from './Layout'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = (theme: Object) => ({
  paper: {
    borderRadius: '2px',
    paddingTop: '40px',
    paddingBottom: '40px',
    paddingLeft: '40px',
    paddingRight: '40px'
  }
})

type Props = {
  classes: Object,
  helmet: boolean,
  title: string
}

const Loading = (props: Props) => {
  return (
    <Layout
      helmet={props.helmet}
      title={props.title}
      content={
        <Paper className={props.classes.paper}>
          <Typography>Loading...</Typography>
          <LinearProgress />
        </Paper>
      }
    />
  )
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  helmet: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(Loading)
