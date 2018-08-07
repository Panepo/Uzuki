import * as types from '../constants/ConstActionTypes'

export function imageUpload(modelId, bool, length) {
  return {
    type: types.IMAGE_UPLOAD,
    modelId,
    bool,
    length
  }
}
