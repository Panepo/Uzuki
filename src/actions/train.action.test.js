import * as action from './train.action'
import { actionTrain } from '../models/train.model'

describe('Action >> image.action test', () => {
  it('should create a correct action', () => {
    const input = ['faceA', 'faceB']
    const expectedAction = {
      type: actionTrain.TRAIN_FACE_ADD,
      payload: input
    }
    expect(action.faceAdd(input)).toEqual(expectedAction)
  })

  it('should create a correct action', () => {
    const input = 87
    const expectedAction = {
      type: actionTrain.TRAIN_FACE_REMOVE,
      payload: input
    }
    expect(action.faceRemove(input)).toEqual(expectedAction)
  })

  it('should create a correct action', () => {
    const expectedAction = {
      type: actionTrain.TRAIN_FACE_CLEAR,
      payload: null
    }
    expect(action.faceClear()).toEqual(expectedAction)
  })

  it('should create a correct action', () => {
    const input = 5487987
    const expectedAction = {
      type: actionTrain.TRAIN_DATA_SAVE,
      payload: input
    }
    expect(action.dateSave(input)).toEqual(expectedAction)
  })

  it('should create a correct action', () => {
    const expectedAction = {
      type: actionTrain.TRAIN_DATA_CLEAR,
      payload: null
    }
    expect(action.dataClear()).toEqual(expectedAction)
  })
})
