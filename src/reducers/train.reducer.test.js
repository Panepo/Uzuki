import { train } from './train.reducer'
import { actionTrain } from '../models/train.model'

const initialState = {
  face: ['testA', 'testB'],
  data: ['face.json']
}

describe('Reducer >> train.reducer test', () => {
  it('should handle TRAIN_FACE_ADD', () => {
    const action = {
      type: actionTrain.TRAIN_FACE_ADD,
      payload: ['testA', 'testB']
    }
    const outputState = {
      face: ['testA', 'testB', 'testA', 'testB'],
      data: ['face.json']
    }
    expect(train(initialState, action)).toEqual(outputState)
  })

  it('should handle TRAIN_FACE_REMOVE', () => {
    const action = {
      type: actionTrain.TRAIN_FACE_REMOVE,
      payload: 1
    }
    const outputState = {
      face: ['testA'],
      data: ['face.json']
    }
    expect(train(initialState, action)).toEqual(outputState)
  })

  it('should handle TRAIN_FACE_CLEAR', () => {
    const action = {
      type: actionTrain.TRAIN_FACE_CLEAR,
      payload: null
    }
    const outputState = {
      face: [],
      data: ['face.json']
    }
    expect(train(initialState, action)).toEqual(outputState)
  })

  it('should handle TRAIN_DATA_SAVE', () => {
    const action = {
      type: actionTrain.TRAIN_DATA_SAVE,
      payload: { test: 'test' }
    }
    const outputState = {
      face: ['testA'],
      data: { test: 'test' }
    }
    expect(train(initialState, action)).toEqual(outputState)
  })

  it('should handle TRAIN_DATA_CLEAR', () => {
    const action = {
      type: actionTrain.TRAIN_DATA_CLEAR,
      payload: null
    }
    const outputState = {
      face: ['testA'],
      data: []
    }
    expect(train(initialState, action)).toEqual(outputState)
  })
})
