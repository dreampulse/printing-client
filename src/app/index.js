import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {AppContainer} from 'react-hot-loader'
import browserUpdate from 'browser-update'

import 'babel-polyfill'

import './service/logging'
import {getFeatureFlags} from './lib/feature-flags'

import Store from './store'
import Router from './router'
import * as selectors from './lib/selector'

import '../sass/main.scss'

import {init} from './action-next/core'

// Warn if the browser is one version behind
browserUpdate({notify: {i: -1, f: -1, o: -1, s: -1, c: -1}}) // Warn outdated browsers

const history = createHistory()
const store = Store(history)

function renderApp(CurrentRouter) {
  render(
    <AppContainer>
      <Provider store={store}>
        <CurrentRouter store={store} history={history} />
      </Provider>
    </AppContainer>,
    global.document.getElementById('root')
  )
}

store.dispatch(init({featureFlags: getFeatureFlags(global.location)})).then(() => {
  renderApp(Router)

  const bootsplash = global.document.getElementById('bootsplash')
  // TODO: lets fade out the bootsplash, looks nicer
  if (bootsplash) {
    // Otherwise hot reloading breaks
    bootsplash.remove()
  }
})

// Webpack (uglify) will remove this code in the production build
if (process.env.NODE_ENV !== 'production') {
  console.info('NODE_ENV', process.env.NODE_ENV) // eslint-disable-line no-console

  global.store = store
  global.selectors = selectors

  if (module.hot) {
    // Enable Webpack hot module replacement
    module.hot.accept(['./router'], () => {
      // eslint-disable-next-line global-require
      renderApp(require('./router').default)
    })
  }
}
