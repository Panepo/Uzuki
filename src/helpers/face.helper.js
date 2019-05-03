// @flow

import * as faceapi from 'face-api.js'

export async function createFaceMatcher(
  data: { _label: string, _descriptors: any }[]
) {
  const labeledFaceDescriptors = await Promise.all(
    data.map(face => {
      const descriptors = []
      face._descriptors.forEach(desc => {
        const parsedArray = Object.values(desc)
        // $flow-disable-line
        descriptors.push(new Float32Array(parsedArray))
      })
      return new faceapi.LabeledFaceDescriptors(face._label, descriptors)
    })
  )
  return new faceapi.FaceMatcher(labeledFaceDescriptors)
}

export function resizeCanvasAndResults(
  dimensions: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  canvas: HTMLCanvasElement,
  results: any
) {
  const { width, height } =
    dimensions instanceof HTMLVideoElement
      ? faceapi.getMediaDimensions(dimensions)
      : dimensions
  canvas.width = width
  canvas.height = height

  // resize detections (and landmarks) in case displayed image is smaller than
  // original size
  return faceapi.resizeResults(results, { width, height })
}

export function drawDetections(
  dimensions: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  canvas: HTMLCanvasElement,
  detections: any
) {
  const resizedDetections = resizeCanvasAndResults(
    dimensions,
    canvas,
    detections
  )
  faceapi.drawDetection(canvas, resizedDetections)
}

export function drawLandmarks(
  dimensions: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  canvas: HTMLCanvasElement,
  results: any,
  withBoxes: boolean = true
) {
  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)

  if (withBoxes) {
    faceapi.drawDetection(canvas, resizedResults.map(det => det.detection))
  }

  const faceLandmarks = resizedResults.map(det => det.landmarks)
  const drawLandmarksOptions = {
    lineWidth: 2,
    drawLines: true,
    color: 'green'
  }
  faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
}

export function drawExpressions(
  dimensions: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
  canvas: HTMLCanvasElement,
  results: any,
  thresh: number,
  withBoxes: boolean = true
) {
  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)

  if (withBoxes) {
    faceapi.drawDetection(canvas, resizedResults.map(det => det.detection), {
      withScore: false
    })
  }

  faceapi.drawFaceExpressions(
    canvas,
    resizedResults.map(({ detection, expressions }) => ({
      position: detection.box,
      expressions
    }))
  )
}

export function drawFPS(
  canvas: HTMLCanvasElement,
  text: string,
  color: string,
  location: { x: number, y: number }
) {
  const ctx = canvas.getContext('2d')
  ctx.font = '30px Comic Sans MS'
  ctx.fillStyle = color
  ctx.fillText(text, location.x, location.y)
}

export function extractData(
  input: string,
  rect: { x: number, y: number, width: number, height: number }
): ImageData | null {
  const image = document.getElementById(input)
  if (image instanceof HTMLCanvasElement) {
    let canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    return ctx.getImageData(rect.x, rect.y, rect.width, rect.height)
  }
  return null
}
