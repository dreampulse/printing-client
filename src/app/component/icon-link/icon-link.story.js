import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import IconLink from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'
import cartIcon from '../../../asset/icon/cart.svg'

storiesOf('Icon Link', module)
  .add('default', () => <IconLink icon={placeholderIcon} onClick={action('onClick')} />)
  .add('disabled', () => <IconLink icon={placeholderIcon} disabled onClick={action('onClick')} />)
  .add('cartCount', () => <IconLink icon={cartIcon} onClick={action('onClick')} cartCount={99} />)
