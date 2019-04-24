import {configure} from '@storybook/react'
import '../src/sass/main.scss'

function loadStories() {
  // Add id to body to enable css utilities
  document.body.id = 'body'

  const context = require.context('../src', true, /\.story\.js$/)
  context.keys().forEach(context)
}

configure(loadStories, module)
