import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from '../../src/app/component/button'
import ButtonBar from '../../src/app/component/button-bar'

storiesOf('Button Bar', module).add('default', () => (
  <ButtonBar>
    <Button label="Button" onClick={action('click')} />
    <Button label="Button" onClick={action('click')} />
    <Button label="Button" onClick={action('click')} />
  </ButtonBar>
))
