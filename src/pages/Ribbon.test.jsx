import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Ribbon from './Ribbon'

describe('Page >> Ribbon test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Ribbon />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
