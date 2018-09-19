import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import IconLink from '.'

import placeholderIcon from '../../../asset/icon/placeholder.svg'
import cartIcon from '../../../asset/icon/cart.svg'

storiesOf('Icon Link', module)
  .add('default', () => <IconLink icon={placeholderIcon} onClick={action('click')} />)
  .add('disabled', () => <IconLink icon={placeholderIcon} disabled onClick={action('click')} />)
  .add('l', () => <IconLink modifiers={['l']} icon={placeholderIcon} onClick={action('click')} />)
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', minHeight: '100vh'}}>
      <IconLink icon={placeholderIcon} modifiers={['invert']} onClick={action('click')} />
    </div>
  ))
  .add('invert & disabled', () => (
    <div className="u-invert" style={{width: '100%', minHeight: '100vh'}}>
      <IconLink icon={placeholderIcon} modifiers={['invert']} disabled onClick={action('click')} />
    </div>
  ))
  .add('cart', () => <IconLink icon={cartIcon} onClick={action('click')} cartCount={99} />)
