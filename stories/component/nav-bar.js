import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import NavBar from '../../src/app/component/nav-bar'
import Button from '../../src/app/component/button'
import IconLink from '../../src/app/component/icon-link'

import helpIcon from '../../src/asset/icon/help.svg'
import cartIcon from '../../src/asset/icon/cart.svg'

storiesOf('Nav Bar', module).add('default', () => (
  <NavBar onClickIdentity={action('click identity')}>
    <Button modifiers={['invert', 'compact']} label="Upload" />
    <IconLink modifiers={['invert']} icon={cartIcon} cartCount={99} />
    <IconLink modifiers={['invert']} icon={helpIcon} />
  </NavBar>
))
