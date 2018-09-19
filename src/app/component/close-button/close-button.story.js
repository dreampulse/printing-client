import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import CloseButton from '.'

storiesOf('Close Button', module)
  .add('default', () => <CloseButton onClick={action('click')} />)
  .add('l', () => <CloseButton modifiers={['l']} onClick={action('click')} />)
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', 'min-height': '100vh'}}>
      <CloseButton modifiers={['invert']} onClick={action('click')} />
    </div>
  ))
