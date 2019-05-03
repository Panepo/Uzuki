// @flow

import type { Action } from '../models/action.model'

export default function createReducer(initialState: Object, handlers: Object) {
  return function reducer(state: Object = initialState, action: Action<any>) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
