import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'

export default class ImageGallery extends Component {
  render() {
    const {
      modelId,
      modelClass,
      imageSrc,
      imageWidth,
      imageHeight,
      imageText
    } = this.props
    const output = []
    let outTemp
    let outKeyTemp

    for (let i = 0; i < imageSrc.length; i += 1) {
      outKeyTemp = modelId + '_imageGallery_image_' + i.toString()
      outTemp = (
        <img
          className={modelClass}
          id={outKeyTemp}
          key={outKeyTemp}
          src={imageSrc[i]}
          width={imageWidth}
          height={imageHeight}
          alt={imageText}
        />
      )
      output.push(outTemp)
    }

    return <FlipMove className="flip-wrapper">{output}</FlipMove>
  }
}

ImageGallery.propTypes = {
  modelId: PropTypes.string,
  modelClass: PropTypes.string,
  imageSrc: PropTypes.array,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  imageText: PropTypes.string
}

ImageGallery.defaultProps = {
  modelId: 'ImageGallery',
  modelClass: 'ImageGallery',
  imageWidth: 100,
  imageHeight: 100,
  imageText: 'ImageGallery'
}
