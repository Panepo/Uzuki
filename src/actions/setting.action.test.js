import * as action from './setting.action'
import { actionSetting } from '../models/setting.model'

describe('Action >> image.action test', () => {
  it('should create a correct action', () => {
    const input = {
      x: 1280,
      y: 720
    }
    const expectedAction = {
      type: actionSetting.SETTING_VIDEO,
      payload: input
    }
    expect(action.modifyVideo(input)).toEqual(expectedAction)
  })

  it('should create a correct action', () => {
    const input = {
      x: 400,
      y: 400,
      width: 200,
      height: 200
    }
    const expectedAction = {
      type: actionSetting.SETTING_RECT,
      payload: input
    }
    expect(action.modifyRect(input)).toEqual(expectedAction)
  })
})
