// @flow
import createReducer from './createReducer'
import type { Action } from '../models/action.model'
import { actionTrain } from '../models/train.model'
import type { StateTrain } from '../models/train.model'

const initialState: StateTrain = {
  face: [],
  data: [],
  knn: null
}

export const train = createReducer(initialState, {
  [actionTrain.TRAIN_FACE_ADD](state: StateTrain, action: Action<string[]>) {
    return { ...state, face: state.face.concat(action.payload) }
  },
  [actionTrain.TRAIN_FACE_REMOVE](state: StateTrain, action: Action<number>) {
    state.face.splice(action.payload, 1)
    return state
  },
  [actionTrain.TRAIN_FACE_CLEAR](state: StateTrain, action: Action<null>) {
    return { ...state, face: [] }
  },
  [actionTrain.TRAIN_DATA_SAVE](state: StateTrain, action: Action<any>) {
    return { ...state, data: action.payload }
  },
  [actionTrain.TRAIN_DATA_CLEAR](state: StateTrain, action: Action<null>) {
    return { ...state, data: [] }
  },
  [actionTrain.TRAIN_KNN_SAVE](state: StateTrain, action: Action<any>) {
    return { ...state, knn: action.payload }
  },
  [actionTrain.TRAIN_KNN_CLEAR](state: StateTrain, action: Action<null>) {
    return { ...state, knn: null }
  }
})
