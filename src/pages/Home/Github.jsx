// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GitHubButton from 'react-github-btn'

const styles = (theme: Object) => ({
  root: {}
})

type Props = {
  classes: Object
}

const Ribbon = (props: Props) => {
  return (
    <Grid container={true} className={props.classes.grid} justify="center">
      <GitHubButton
        href="https://github.com/Panepo/Uzuki/subscription"
        data-icon="octicon-eye"
        data-size="large"
        aria-label="Watch Panepo/Uzuki on GitHub">
        Watch
      </GitHubButton>
      <GitHubButton
        href="https://github.com/Panepo/Uzuki"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star Panepo/Uzuki on GitHub">
        Star
      </GitHubButton>
      <GitHubButton
        href="https://github.com/Panepo/Uzuki/fork"
        data-icon="octicon-repo-forked"
        data-size="large"
        aria-label="Fork Panepo/Uzuki on GitHub">
        Fork
      </GitHubButton>
    </Grid>
  )
}

Ribbon.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Ribbon)
