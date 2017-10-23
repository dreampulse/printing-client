import {configure} from '@storybook/react'
import '../src/sass/main.scss'

function loadStories() {
  const context = require.context('../stories', true, /\.js?$/)
  context.keys().forEach(context)
}

configure(loadStories, module)
