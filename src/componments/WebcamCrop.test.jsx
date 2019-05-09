import * as React from 'react'
import * as ReactDOM from 'react-dom'
import WebcamCrop from './WebcamCrop'

describe('Componment >> WebcamCrop test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <WebcamCrop
        videoWidth={640}
        videoHeight={480}
        tickRender={1000}
        audio={false}
        cropx={10}
        cropy={10}
        cropwidth={100}
        cropheight={100}
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
