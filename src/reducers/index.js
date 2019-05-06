import { combineReducers } from 'redux'
import type { History } from 'history'
import { connectRouter } from 'connected-react-router'
import * as info from './info.reducer'
import * as setting from './setting.reducer'
import * as train from './train.reducer'

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...info,
    ...setting,
    ...train
  })

export default rootReducer
