import * as React from 'react'
import Layout from './Layout'
import { createMockStore, createMockDispatch } from 'redux-test-utils'
import shallowWithStore from '../helpers/enzyme.helper'
import { actionInfo } from '../models/info.model'

describe('Page >> Layout test', () => {
  it('should render successfully', () => {
    const mockState = {
      info: { onoff: false, variant: 'info', message: '' }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(
      <Layout
        helmet={true}
        title={'test'}
        content={<div />}
        gridNormal={10}
        gridPhone={12}
      />,
      store
    )
    expect(component).toBeTruthy()
  })

  it('should createMockStore works', () => {
    const mockState = {
      info: { onoff: false, variant: 'info', message: '' }
    }
    const store = createMockStore(mockState)
    const action = {
      type: actionInfo.INFO_SET,
      payload: { onoff: true, variant: 'success', message: 'test' }
    }
    store.dispatch(action)
    expect(store.getAction(action.type)).toEqual(action)
    expect(store.getActions()).toEqual([action])
    expect(store.isActionDispatched(action)).toBe(true)
    expect(store.isActionTypeDispatched(action.type)).toBe(true)
    expect(store.getState()).toBe(mockState)
  })

  it('should createMockDispatch works', () => {
    const dispatchMock = createMockDispatch()
    const action = {
      type: actionInfo.INFO_SET,
      payload: { onoff: true, variant: 'success', message: 'test' }
    }
    dispatchMock.dispatch(action)

    expect(dispatchMock.getAction(action.type)).toEqual(action)
    expect(dispatchMock.getActions()).toEqual([action])
    expect(dispatchMock.isActionDispatched(action)).toBe(true)
    expect(dispatchMock.isActionTypeDispatched(action.type)).toBe(true)
  })
})
