import * as React from 'react'
import * as ReactDOM from 'react-dom'
import WebcamRectDraw from './WebcamRectDraw'

const getPosition = ({ x, y, width, height }) => {}

describe('Componment >> WebcamRectDraw test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <WebcamRectDraw
        videoWidth={640}
        videoHeight={480}
        tickRender={1000}
        audio={false}
        rect={{ x: 10, y: 10, width: 100, height: 100 }}
        rectColor={'yellow'}
        rectLine={10}
        getPosition={getPosition}
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
