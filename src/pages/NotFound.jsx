// @flow

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import type { StateImage } from '../models/image.model'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Button from '@material-ui/core/Button'

const image404 = require('../images/404.jpg')
const image404u = require('../images/uzuki404.jpg')

const styles = (theme: Object) => ({
  card: {
    minWidth: 275
  }
})

type ProvidedProps = {
  classes: Object
}

type Props = {
  image: StateImage
}

class NotFound extends React.Component<ProvidedProps & Props> {
  render() {
    return (
      <Layout
        helmet={true}
        title={'File Not Found'}
        content={
          <Card className={this.props.classes.card}>
            <CardActionArea>
              {this.props.image.switch ? (
                <img src={image404u} alt={'404'} width={640} height={480} />
              ) : (
                <img src={image404} alt={'404'} width={640} height={480} />
              )}
            </CardActionArea>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                File Not Found
              </Typography>
            </CardContent>
            <CardActions>
              <Link to="/home">
                <Button color="primary">Home</Button>
              </Link>
            </CardActions>
          </Card>
        }
      />
    )
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.shape({
    switch: PropTypes.bool.isRequired
  })
}

const mapStateToProps = state => {
  return {
    image: state.image
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NotFound))
