// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { environment } from '../environment'

const styles = (theme: Object) => ({
  root: {
    width: '100%',
    height: '60vh',
    background: environment.ColorRibbon
  }
})

type Props = {
  classes: Object
}

const Ribbon = (props: Props) => {
  return <div className={props.classes.root} />
}

Ribbon.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Ribbon)
