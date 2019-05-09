import * as React from 'react'
import NotFound from './NotFound'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../helpers/enzyme.helper'

describe('Page >> NotFound test', () => {
  it('should render successfully', () => {
    const mockState = {
      switch: true
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(<NotFound />, store)
    expect(component).toBeTruthy()
  })
})
