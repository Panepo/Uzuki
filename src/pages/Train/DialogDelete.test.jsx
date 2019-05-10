import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DialogDelete from './DialogDelete'

const toggleDialog = (target, onoff, name) => () => {}
const handleAccept = target => event => {}

describe('Page >> DialogDelete test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <DialogDelete
        dialogStatus={true}
        imageSrc={'test'}
        toggleDialog={toggleDialog}
        handleAccept={handleAccept}
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
