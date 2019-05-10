import { setting, initialState } from './setting.reducer'
import { actionSetting } from '../models/setting.model'

describe('Reducer >> setting.reducer test', () => {
  it('should handle SETTING_VIDEO', () => {
    const action = {
      type: actionSetting.SETTING_VIDEO,
      payload: {
        width: 640,
        height: 480
      }
    }
    const outputState = {
      rect: { x: 100, y: 100, width: 100, height: 100 },
      video: {
        width: 640,
        height: 480
      }
    }
    expect(setting(initialState, action)).toEqual(outputState)
  })

  it('should handle SETTING_RECT', () => {
    const action = {
      type: actionSetting.SETTING_RECT,
      payload: { x: 1000, y: 1000, width: 100, height: 100 }
    }
    const outputState = {
      rect: { x: 1000, y: 1000, width: 100, height: 100 },
      video: {
        width: 1280,
        height: 720
      }
    }
    expect(setting(initialState, action)).toEqual(outputState)
  })
})
