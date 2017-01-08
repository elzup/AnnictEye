// @flow

import React, { Component, applyMiddleware, createStore } from 'react'
import { Provider, thunk } from 'react-redux'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import RootContainer from './RootContainer'
import applyConfigSettings from '../Config'

applyConfigSettings()

// create our store
const logger = createLogger()
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
)

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
