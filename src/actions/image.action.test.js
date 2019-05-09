import * as action from './image.action'
import { actionImage } from '../models/image.model'

describe('Action >> image.action test', () => {
  it('should create a correct action', () => {
    const input = true
    const expectedAction = {
      type: actionImage.IMAGE_SWITCH,
      payload: input
    }
    expect(action.imageSwitch(input)).toEqual(expectedAction)
  })
})
