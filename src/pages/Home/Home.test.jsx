import * as React from 'react'
import Home from './Home'
import { createMockStore, createMockDispatch } from 'redux-test-utils'
import shallowWithStore from '../../helpers/enzyme.helper'
import { actionImage } from '../../models/image.model'

describe('Page >> Home test', () => {
  it('should render successfully', () => {
    const mockState = {
      image: { switch: false },
      train: { face: [], data: [] }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(<Home />, store)
    expect(component).toBeTruthy()
  })

  it('should render successfully', () => {
    const mockState = {
      image: { switch: true },
      train: { face: [], data: ['test1', 'test2'] }
    }
    const store = createMockStore(mockState)
    const component = shallowWithStore(<Home />, store)
    expect(component).toBeTruthy()
  })

  it('should createMockStore works', () => {
    const mockState = {
      info: { onoff: false, variant: 'info', message: '' }
    }
    const store = createMockStore(mockState)
    const action = {
      type: actionImage.IMAGE_SWITCH,
      payload: true
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
      type: actionImage.IMAGE_SWITCH,
      payload: false
    }
    dispatchMock.dispatch(action)

    expect(dispatchMock.getAction(action.type)).toEqual(action)
    expect(dispatchMock.getActions()).toEqual([action])
    expect(dispatchMock.isActionDispatched(action)).toBe(true)
    expect(dispatchMock.isActionTypeDispatched(action.type)).toBe(true)
  })
})
