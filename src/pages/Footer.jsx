// @flow

import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: Object) => ({
  root: {
    background: '#424242',
    height: '60px',
    width: '100%'
  },
  text: {
    color: '#BDBDBD',
    fontSize: '13px',
    paddingLeft: '40px',
    paddingTop: '20px'
  }
})

type Props = {
  classes: Object
}

const Footer = (props: Props) => {
  return (
    <footer className={props.classes.root}>
      <Typography className={props.classes.text}>
        Copyright &copy; Panepo@Github 2019 All Rights Reserved.
      </Typography>
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
