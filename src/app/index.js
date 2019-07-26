import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {AppContainer} from 'react-hot-loader'
import browserUpdate from 'browser-update'

import './service/logging'

import Store from './store'
import Router from './router'
import {handleIncomingMessages} from './service/intercom'
import {trackPageImpression} from './service/google-analytics'
import {setItem} from './service/local-storage'

import '../sass/main.scss'

const history = createBrowserHistory()
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

renderApp(Router)

handleIncomingMessages()

// Webpack (uglify) will remove this code in the production build
if (process.env.NODE_ENV !== 'production') {
  console.info('NODE_ENV', process.env.NODE_ENV) // eslint-disable-line no-console

  global.store = store

  if (module.hot) {
    // Enable Webpack hot module replacement
    module.hot.accept(['./router'], () => {
      // eslint-disable-next-line global-require
      renderApp(require('./router').default)
    })
  }
} else {
  // In production version only
  browserUpdate({required: {i: -1, f: -1, o: -1, s: -1, c: -1}}) // Warn outdated browsers

  history.listen(location => {
    const {pathname} = location
    trackPageImpression(pathname)
  })
}

global.addEventListener('unload', function(_event) {
  const {core: coreState} = store.getState()

  setItem('__EXAMPLE', {
    coreState,
    timestamp: new Date()
  })
})
