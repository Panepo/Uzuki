import { IMAGE_UPLOAD } from '../constants/ConstActionTypes'
import * as faceapi from 'face-api.js'

const initialState = {
  faceDesc: [],
  contentDisplay: false,
  serverTick: 0
}

async function modelLoad() {
  await faceapi.loadFaceDetectionModel('/models')
}
const minConfidence = 0.5

async function getFaceDesc(modelId, length) {
  let output = []

  for (let i = 0; i < length; i += 1) {
    const imgId = modelId + '_imageGallery_image_' + i.toString()
    const fullFaceDescriptions = await faceapi.allFaces(imgId, minConfidence)

    console.log(fullFaceDescriptions)
  }

  return output
}

export default function reducerTensor(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOAD:
      return Object.assign({}, state, {
        // faceDesc: getFaceDesc(action.modelId, action.length),
        serverTick: state.serverTick + 1
      })
    default:
      modelLoad()
      return state
  }
}
