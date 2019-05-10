import * as React from 'react'
import NotReady from './NotReady'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../../helpers/enzyme.helper'

describe('Page >> NotReady test', () => {
  it('should render successfully', () => {
    const mockState = {
      image: { switch: true }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(<NotReady />, store)
    expect(component).toBeTruthy()
  })
})
