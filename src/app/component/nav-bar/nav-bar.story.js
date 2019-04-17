import React from 'react'
import {storiesOf} from '@storybook/react'

import NavBar from '.'
import IconLink from '../icon-link'
import Button from '../button'
import Logo from '../logo'

import config from '../../../../config'

import helpIcon from '../../../asset/icon/help.svg'
import cartIcon from '../../../asset/icon/cart.svg'

storiesOf('NavBar', module).add('default', () => (
  <NavBar
    leftContent={<Logo href={config.landingPageUrl} />}
    rightContent={
      <>
        <Button minor compact label="Some Button" />
        <IconLink icon={cartIcon} cartCount={99} />
        <IconLink icon={helpIcon} />
      </>
    }
  />
))
