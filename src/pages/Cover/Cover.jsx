// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Layout from '../Layout'

const styles = (theme: Object) => ({
  iframe: {
    width: '100%',
    height: '800px'
  }
})

type Props = {
  classes: Object
}

const Cover = (props: Props) => {
  return (
    <Layout
      helmet={true}
      title={'Nonsense activity generator | Uzuki'}
      gridNormal={10}
      gridPhone={10}
      content={
        <iframe
          className={props.classes.iframe}
          title="nonsense"
          src="https://svenstaro.github.io/genact/"
        />
      }
    />
  )
}

Cover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Cover)
