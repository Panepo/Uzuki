import * as React from 'react'
import Loading from './Loading'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../helpers/enzyme.helper'

describe('Page >> Loading test', () => {
  it('should render successfully', () => {
    const mockState = {
      info: { onoff: false, variant: 'info', message: '' }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(
      <Loading helmet={true} title={'test'} />,
      store
    )
    expect(component).toBeTruthy()
  })
})
