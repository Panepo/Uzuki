// @flow

import type Action from './action.model'
import type { CanvasRect, VideoConstraints } from './misc.model'

export const actionSetting = {
  SETTING_VIDEO: 'SETTING_VIDEO',
  SETTING_RECT: 'SETTING_RECT'
}

export type ActionSetting = Action<Object>

export type StateSetting = {
  rect: CanvasRect,
  video: VideoConstraints
}
