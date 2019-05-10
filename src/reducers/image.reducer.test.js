import { image, initialState } from './image.reducer'
import { actionImage } from '../models/image.model'
import { actionTrain } from '../models/train.model'

describe('Reducer >> image.reducer test', () => {
  it('should handle IMAGE_SWITCH', () => {
    const action = {
      type: actionImage.IMAGE_SWITCH,
      payload: true
    }
    const outputState = {
      switch: true
    }
    expect(image(initialState, action)).toEqual(outputState)
  })

  it('should handle nothing', () => {
    const action = {
      type: actionTrain.TRAIN_FACE_REMOVE,
      payload: 1
    }
    expect(image(initialState, action)).toEqual(initialState)
  })
})
