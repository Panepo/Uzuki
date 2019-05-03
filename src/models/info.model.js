// @flow

import type Action from './action.model'

export const actionInfo = {
  INFO_SET: 'INFO_SET',
  INFO_CLOSE: 'INFO_CLOSE'
}

export type StateInfo = {
  onoff: boolean,
  variant: 'success' | 'warning' | 'error' | 'info',
  message: string
}

export type ActionInfo = Action<StateInfo> | Action<null>
