// @flow

import { Action } from '../models/action.model'
import { actionInfo } from '../models/info.model'
import type { StateInfo } from '../models/info.model'

export function infoSet(input: StateInfo): Action<StateInfo> {
  return {
    type: actionInfo.INFO_SET,
    payload: input
  }
}

export function infoClose(): Action<null> {
  return {
    type: actionInfo.INFO_CLOSE,
    payload: null
  }
}
