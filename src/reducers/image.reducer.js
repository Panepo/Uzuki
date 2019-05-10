// @flow
import createReducer from './createReducer'
import type { Action } from '../models/action.model'
import { actionImage } from '../models/image.model'
import type { StateImage } from '../models/image.model'

export const initialState: StateImage = {
  switch: false
}

export const image = createReducer(initialState, {
  [actionImage.IMAGE_SWITCH](state: StateImage, action: Action<boolean>) {
    return { ...state, switch: action.payload }
  }
})
