import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import IconLink from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'
import cartIcon from '../../../asset/icon/cart.svg'

storiesOf('Icon Link', module)
  .add('default', () => <IconLink icon={placeholderIcon} onClick={action('click')} />)
  .add('disabled', () => <IconLink icon={placeholderIcon} disabled onClick={action('click')} />)
  .add('cart', () => <IconLink icon={cartIcon} onClick={action('click')} cartCount={99} />)
