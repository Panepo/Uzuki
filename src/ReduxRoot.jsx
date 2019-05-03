import * as React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import Typography from '@material-ui/core/Typography'
import { persistor, store } from './configureStore'

const ReduxRoot = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Typography>Loading...</Typography>}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

export default ReduxRoot
