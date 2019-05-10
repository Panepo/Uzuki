// @flow
import createReducer from './createReducer'
import type { Action } from '../models/action.model'
import { actionInfo } from '../models/info.model'
import type { StateInfo } from '../models/info.model'

export const initialState: StateInfo = {
  onoff: false,
  variant: 'info',
  message: ''
}

export const info = createReducer(initialState, {
  [actionInfo.INFO_SET](state: StateInfo, action: Action<StateInfo>) {
    return action.payload
  },
  [actionInfo.INFO_CLOSE](state: StateInfo, action: Action<null>) {
    return { ...state, onoff: false }
  }
})
