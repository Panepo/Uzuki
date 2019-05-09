// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { BrowserHistory, HashHistory, MemoryHistory } from 'history'

import type { ActionSetting, StateSetting } from './setting.model'
import type { ActionInfo, StateInfo } from './info.model'
import type { ActionImage, StateImage } from './image.model'
import type { ActionTrain, StateTrain } from './train.model'

export type RouterHistory = BrowserHistory | HashHistory | MemoryHistory

export type ReduxInitAction = { type: '@@INIT' }

export type State = StateSetting & StateInfo & StateImage & StateTrain

export type Action =
  | ReduxInitAction
  | ActionSetting
  | ActionInfo
  | ActionImage
  | ActionTrain

export type Store = ReduxStore<State, Action>

export type Dispatch = ReduxDispatch<Action>
