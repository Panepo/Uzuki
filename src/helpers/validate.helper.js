// @flow

// import Validator from 'validator'
import isEmpty from 'is-empty'
import type {
  CanvasRect,
  CanvasRectError,
  VideoConstraints,
  VideoConstraintsError
} from '../models/misc.model'

export function validateRect(
  input: CanvasRect
): {
  errors: CanvasRectError,
  isValid: boolean
} {
  const errors: CanvasRectError = {
    x: { onoff: false, message: '' },
    y: { onoff: false, message: '' },
    width: { onoff: false, message: '' },
    height: { onoff: false, message: '' }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export function validateVideo(
  input: VideoConstraints
): {
  errors: VideoConstraintsError,
  isValid: boolean
} {
  const errors: VideoConstraintsError = {
    width: { onoff: false, message: '' },
    height: { onoff: false, message: '' }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
