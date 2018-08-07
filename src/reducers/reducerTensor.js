import { IMAGE_UPLOAD } from '../constants/ConstActionTypes'
import * as faceapi from 'face-api.js'

const initialState = {
  faceDesc: [],
  contentDisplay: false
}

const net = new faceapi.FaceRecognitionNet()

async function modelLoad() {
  await net.load('/models/face_recognition_model-weights_manifest.json')
}

async function getFaceDesc(modelId, length) {
  let output = []

  for (let i = 0; i < length; i += 1) {
    let imgId = modelId + '_imageUploader_image_' + i.toString()
    let desc = await net.computeFaceDescriptor(imgId)
    output.push(desc)
  }

  return output
}

export default function reducerTensor(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOAD:
      return Object.assign({}, state, {
        faceDesc: getFaceDesc(action.modelId, action.length)
      })
    default:
      modelLoad()
      return state
  }
}
