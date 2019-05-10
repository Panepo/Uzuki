import * as React from 'react'
import Setting from './Setting'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../../helpers/enzyme.helper'

describe('Page >> Setting test', () => {
  it('should render successfully', () => {
    const mockState = {
      setting: {
        rect: { x: 100, y: 100, width: 100, height: 100 },
        video: {
          width: 1280,
          height: 720
        }
      },
      image: {
        switch: false
      }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(<Setting />, store)
    expect(component).toBeTruthy()
  })
})
