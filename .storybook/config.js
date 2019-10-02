import {configure, addParameters, addDecorator} from '@storybook/react'

import '../src/sass/main.scss'

addParameters({
  options: {
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    showPanel: true,
    sortStoriesByKind: false
  }
})

function loadStories() {
  // Add id to body to enable css utilities
  global.document.body.id = 'body'

  const context = require.context('../src', true, /\.story\.js$/)
  context.keys().forEach(context)
}

configure(loadStories, module)
