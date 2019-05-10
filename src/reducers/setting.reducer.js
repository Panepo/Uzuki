// @flow
import createReducer from './createReducer'
import type { Action } from '../models/action.model'
import { actionSetting } from '../models/setting.model'
import type { StateSetting } from '../models/setting.model'
import type { CanvasRect, VideoConstraints } from '../models/misc.model'

export const initialState: StateSetting = {
  rect: { x: 100, y: 100, width: 100, height: 100 },
  video: {
    width: 1280,
    height: 720
  }
}

export const setting = createReducer(initialState, {
  [actionSetting.SETTING_VIDEO](
    state: StateSetting,
    action: Action<VideoConstraints>
  ) {
    return { ...state, video: action.payload }
  },
  [actionSetting.SETTING_RECT](
    state: StateSetting,
    action: Action<CanvasRect>
  ) {
    return { ...state, rect: action.payload }
  }
})
