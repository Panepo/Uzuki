import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RenderList from './RenderList'

const toggleDialog = (target, onoff, name) => () => {}

describe('Page >> RenderList test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <RenderList
        faces={['test1', 'test2']}
        toggleDialog={toggleDialog}
        toggleImage={true}
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
