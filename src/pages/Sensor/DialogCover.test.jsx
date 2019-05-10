import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DialogCover from './DialogCover'

const toggleDialog = (target, onoff, name) => () => {}

describe('Page >> DialogCover test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <DialogCover dialogStatus={true} toggleDialog={toggleDialog} />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
