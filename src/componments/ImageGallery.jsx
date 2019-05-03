// @flow

import * as React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FlipMove from 'react-flip-move'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: Object) => ({
  image: {
    margin: '1px'
  }
})

type Props = {
  classes: Object,
  className: string,
  imageSrc: string[],
  imageWidth: number,
  imageHeight: number,
  imageText: string
}

const ImageGallery = (props: Props) => {
  const {
    classes,
    className,
    imageSrc,
    imageWidth,
    imageHeight,
    imageText
  } = props
  const renderPreview = imageSrc.map(image => (
    <img
      className={classes.image}
      id={image}
      key={image}
      src={image}
      width={imageWidth}
      height={imageHeight}
      alt={imageText}
    />
  ))
  return (
    <FlipMove className={classNames('flip-wrapper', className)}>
      {renderPreview}
    </FlipMove>
  )
}

ImageGallery.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  imageSrc: PropTypes.array,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imageText: PropTypes.string
}

export default withStyles(styles)(ImageGallery)
