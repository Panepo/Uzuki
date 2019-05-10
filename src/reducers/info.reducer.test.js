import { info, initialState } from './info.reducer'
import { actionInfo } from '../models/info.model'

describe('Reducer >> info.reducer test', () => {
  it('should handle INFO_SET', () => {
    const action = {
      type: actionInfo.INFO_SET,
      payload: {
        onoff: false,
        variant: 'success',
        message: 'test'
      }
    }
    const outputState = {
      onoff: false,
      variant: 'success',
      message: 'test'
    }
    expect(info(initialState, action)).toEqual(outputState)
  })

  it('should handle INFO_CLOSE', () => {
    const action = {
      type: actionInfo.INFO_CLOSE,
      payload: null
    }
    const outputState = {
      onoff: false,
      variant: 'info',
      message: ''
    }
    expect(info(initialState, action)).toEqual(outputState)
  })
})
