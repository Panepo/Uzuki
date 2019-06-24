// @flow

import * as faceapi from 'face-api.js'
import { environment } from '../environment'

export const loadModel = async () => {
  const dev = process.env.NODE_ENV === 'development'
  if (dev) {
    if (environment.useTinyFaceDetector) {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        environment.urlDev + 'models'
      )
    } else {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(
        environment.urlDev + 'models'
      )
    }
    if (environment.useTinyLandmark) {
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
        environment.urlDev + 'models'
      )
    } else {
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        environment.urlDev + 'models'
      )
    }
    await faceapi.loadFaceRecognitionModel(environment.urlDev + 'models')
  } else {
    if (environment.useTinyFaceDetector) {
      await faceapi.nets.tinyFaceDetector.loadFromUri(
        environment.urlProd + 'models'
      )
    } else {
      await faceapi.nets.ssdMobilenetv1.loadFromUri(
        environment.urlProd + 'models'
      )
    }
    if (environment.useTinyLandmark) {
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(
        environment.urlProd + 'models'
      )
    } else {
      await faceapi.nets.faceLandmark68Net.loadFromUri(
        environment.urlProd + 'models'
      )
    }
    await faceapi.loadFaceRecognitionModel(environment.urlProd + 'models')
  }
}
