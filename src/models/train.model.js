// @flow

import type Action from './action.model'

export const actionTrain = {
  TRAIN_FACE_ADD: 'TRAIN_FACE_ADD',
  TRAIN_FACE_REMOVE: 'TRAIN_FACE_REMOVE',
  TRAIN_FACE_CLEAR: 'TRAIN_FACE_CLEAR',
  TRAIN_DATA_SAVE: 'TRAIN_DATA_SAVE',
  TRAIN_DATA_CLEAR: 'TRAIN_DATA_CLEAR',
  TRAIN_KNN_SAVE: 'TRAIN_KNN_SAVE',
  TRAIN_KNN_CLEAR: 'TRAIN_KNN_CLEAR'
}

export type StateTrain = {
  face: string[],
  data: any,
  knn: any | null
}

export type ActionTrain = Action<string[]> | Action<null> | Action<number>
