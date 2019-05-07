// @flow

import { Action } from '../models/action.model'
import { actionImage } from '../models/image.model'

export function imageSwitch(onoff: boolean): Action<boolean> {
  return {
    type: actionImage.IMAGE_SWITCH,
    payload: onoff
  }
}
