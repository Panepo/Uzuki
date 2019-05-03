// @flow

import { Action } from '../models/action.model'
import { actionTrain } from '../models/train.model'

export function faceAdd(faces: string[]): Action<string[]> {
  return {
    type: actionTrain.TRAIN_FACE_ADD,
    payload: faces
  }
}

export function faceRemove(id: number): Action<number> {
  return {
    type: actionTrain.TRAIN_FACE_REMOVE,
    payload: id
  }
}

export function faceClear(): Action<null> {
  return {
    type: actionTrain.TRAIN_FACE_CLEAR,
    payload: null
  }
}

export function dateSave(data: any): Action<any> {
  return {
    type: actionTrain.TRAIN_DATA_SAVE,
    payload: data
  }
}

export function dataClear(): Action<null> {
  return {
    type: actionTrain.TRAIN_DATA_CLEAR,
    payload: null
  }
}
