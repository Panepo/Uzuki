import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import ReduxRoot from './ReduxRoot'
import registerServiceWorker from './serviceWorker'

const rootEl = document.getElementById('uzuki')
ReactDOM.render(<ReduxRoot />, rootEl)

if (module.hot) {
  module.hot.accept('./ReduxRoot', () => {
    const NextApp = require('./ReduxRoot').default
    ReactDOM.render(<NextApp />, rootEl)
  })
}

registerServiceWorker()
