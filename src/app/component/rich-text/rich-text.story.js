import React from 'react'
import {storiesOf} from '@storybook/react'

import RichText from '.'

storiesOf('Rich Text', module)
  .add('default', () => (
    <RichText>
      <p>
        Lorem ipsum dolor <em>sit amet, consectetur</em> adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure{' '}
        <strong>dolor in reprehenderit</strong> in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </RichText>
  ))
  .add('l', () => (
    <RichText modifiers={['l']}>
      <p>
        Lorem ipsum dolor <em>sit amet, consectetur</em> adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure{' '}
        <strong>dolor in reprehenderit</strong> in voluptate velit esse cillum dolore eu fugiat
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
    </RichText>
  ))
