import * as React from 'react'
import DialogCamera from './DialogCamera'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../../helpers/enzyme.helper'

describe('Page >> DialogCamera test', () => {
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
    const component = shallowWithStore(<DialogCamera />, store)
    expect(component).toBeTruthy()
  })
})
