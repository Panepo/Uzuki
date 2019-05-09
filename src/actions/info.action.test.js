import * as action from './info.action'
import { actionInfo } from '../models/info.model'

describe('Action >> info.action test', () => {
  it('should create a correct action', () => {
    const input = {
      onoff: true,
      variant: 'success',
      message: 'test message'
    }
    const expectedAction = {
      type: actionInfo.INFO_SET,
      payload: input
    }
    expect(action.infoSet(input)).toEqual(expectedAction)
  })

  it('should create a correct action', () => {
    const expectedAction = {
      type: actionInfo.INFO_CLOSE,
      payload: null
    }
    expect(action.infoClose()).toEqual(expectedAction)
  })
})
