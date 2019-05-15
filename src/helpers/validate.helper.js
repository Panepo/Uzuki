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
  let isValid = false
  const errors = {
    x: { onoff: false, message: '' },
    y: { onoff: false, message: '' },
    width: { onoff: false, message: '' },
    height: { onoff: false, message: '' }
  }

  if (isEmpty(input.x)) {
    errors.x = { onoff: true, message: 'Invalid input' }
    isValid = true
  }
  if (isEmpty(input.y)) {
    errors.y = { onoff: true, message: 'Invalid input' }
    isValid = true
  }
  if (isEmpty(input.width)) {
    errors.width = { onoff: true, message: 'Invalid input' }
    isValid = true
  }
  if (isEmpty(input.height)) {
    errors.height = { onoff: true, message: 'Invalid input' }
    isValid = true
  }

  return {
    errors,
    isValid: isValid
  }
}

export function validateVideo(
  input: VideoConstraints
): {
  errors: VideoConstraintsError,
  isValid: boolean
} {
  let isValid = false
  const errors = {
    width: { onoff: false, message: '' },
    height: { onoff: false, message: '' }
  }

  if (isEmpty(input.width)) {
    errors.width = { onoff: true, message: 'Invalid input' }
    isValid = true
  }
  if (isEmpty(input.height)) {
    errors.height = { onoff: true, message: 'Invalid input' }
    isValid = true
  }

  return {
    errors,
    isValid: isValid
  }
}
