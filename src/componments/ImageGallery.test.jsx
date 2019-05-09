import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ImageGallery from './ImageGallery'

describe('Componment >> ImageGallery test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ImageGallery
        className={'test'}
        imageSrc={['testA', 'testB']}
        imageWidth={640}
        imageHeight={480}
        imageText={'test'}
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
