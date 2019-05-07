// @flow

import type Action from './action.model'

export const actionImage = {
  IMAGE_SWITCH: 'IMAGE_SWITCH'
}

export type StateImage = {
  switch: boolean
}

export type ActionImage = Action<boolean>
