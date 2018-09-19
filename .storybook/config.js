import {configure} from '@storybook/react'
import '../src/sass/main.scss'

function loadStories() {
  const context = require.context('../src', true, /\.story\.js?$/)
  context.keys().forEach(context)
}

configure(loadStories, module)
