// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GitHubButton from 'react-github-btn'
import { environment } from '../../environment'

const styles = (theme: Object) => ({
  root: {}
})

type Props = {
  classes: Object
}

const Github = (props: Props) => {
  return (
    <Grid container={true} className={props.classes.grid} justify="center">
      <GitHubButton
        href={environment.GithubLink + '/subscription'}
        data-icon="octicon-eye"
        data-size="large"
        aria-label={'Watch ' + environment.title + ' on GitHub'}>
        Watch
      </GitHubButton>
      <GitHubButton
        href={environment.GithubLink}
        data-icon="octicon-star"
        data-size="large"
        aria-label={'Star ' + environment.title + ' on GitHub'}>
        Star
      </GitHubButton>
      <GitHubButton
        href={environment.GithubLink + '/fork'}
        data-icon="octicon-repo-forked"
        data-size="large"
        aria-label={'Fork ' + environment.title + ' on GitHub'}>
        Fork
      </GitHubButton>
    </Grid>
  )
}

Github.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Github)
