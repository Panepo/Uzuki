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
