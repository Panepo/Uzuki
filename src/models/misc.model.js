// @flow

export type LinkSite = {
  text: string,
  link: string
}

export type CanvasRect = {
  x: number,
  y: number,
  width: number,
  height: number
}

export type CanvasRectError = {
  x: { onoff: boolean, message: string },
  y: { onoff: boolean, message: string },
  width: { onoff: boolean, message: string },
  height: { onoff: boolean, message: string }
}

export type VideoConstraints = {
  width: number,
  height: number
}

export type VideoConstraintsError = {
  width: { onoff: boolean, message: string },
  height: { onoff: boolean, message: string }
}
