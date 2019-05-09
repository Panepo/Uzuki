import * as React from 'react'
import * as ReactDOM from 'react-dom'
import InfoBar from './InfoBar'

const onClose = () => {}

describe('Componment >> InfoBar test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <InfoBar
        className={'test'}
        message={'test'}
        onClose={onClose}
        variant={'success'}
      />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
