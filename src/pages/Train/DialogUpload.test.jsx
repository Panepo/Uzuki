import * as React from 'react'
import DialogUpload from './DialogUpload'
import { createMockStore } from 'redux-test-utils'
import shallowWithStore from '../../helpers/enzyme.helper'

const toggleDialog = (target, onoff, name) => () => {}

describe('Page >> DialogUpload test', () => {
  it('should render successfully', () => {
    const mockState = {}
    const store = createMockStore(mockState)
    const component = shallowWithStore(
      <DialogUpload dialogStatus={true} toggleDialog={toggleDialog} />,
      store
    )
    expect(component).toBeTruthy()
  })
})
