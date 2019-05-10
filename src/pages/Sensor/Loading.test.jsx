import * as React from 'react'
import Loading from './Loading'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../../helpers/enzyme.helper'

describe('Page >> Loading test', () => {
  it('should render successfully', () => {
    const mockState = {
      image: { switch: true }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(<Loading />, store)
    expect(component).toBeTruthy()
  })
})
