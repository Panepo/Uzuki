import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import type { PersistConfig } from 'redux-persist'
import * as localforage from 'localforage'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const logger = createLogger()
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
})

const persistConfig: PersistConfig = {
  key: 'root',
  version: 1,
  storage: localforage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

const dev = process.env.NODE_ENV === 'development'

var middleware = dev
  ? applyMiddleware(logger, thunk, routerMiddleware(history))
  : applyMiddleware(thunk, routerMiddleware(history))

if (dev) {
  middleware = composeWithDevTools(middleware)
}

export const store = createStore(persistedReducer, {}, middleware)
export const persistor = persistStore(store)
