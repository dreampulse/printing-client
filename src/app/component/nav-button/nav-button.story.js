import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import NavButton from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

storiesOf('NavButton', module)
  .add('default', () => (
    <NavButton onClick={action('onClick')} label="Nav Button" icon={placeholderIcon} />
  ))
  .add('disabled', () => (
    <NavButton disabled onClick={action('onClick')} label="Nav Button" icon={placeholderIcon} />
  ))
