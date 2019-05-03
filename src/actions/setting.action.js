// @flow

import { Action } from '../models/action.model'
import { actionSetting } from '../models/setting.model'
import type { CanvasRect, VideoConstraints } from '../models/misc.model'

export function modifyVideo(input: VideoConstraints): Action<VideoConstraints> {
  return {
    type: actionSetting.SETTING_VIDEO,
    payload: input
  }
}

export function modifyRect(input: CanvasRect): Action<CanvasRect> {
  return {
    type: actionSetting.SETTING_RECT,
    payload: input
  }
}
