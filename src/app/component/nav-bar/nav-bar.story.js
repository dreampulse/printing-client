import React from 'react'
import {storiesOf} from '@storybook/react'

import NavBar from '.'
import Logo from '../logo'
import CartNavLink from '../cart-nav-link'
import NavLink from '../nav-link'

import config from '../../../../config'

import uploadIcon from '../../../asset/icon/upload.svg'
import helpIcon from '../../../asset/icon/intercom.svg'

storiesOf('NavBar', module).add('default', () => (
  <NavBar
    leftContent={<Logo href={config.landingPageUrl} />}
    rightContent={
      <>
        <NavLink label="Upload" icon={uploadIcon} />
        <CartNavLink label="Your Cart" count={6} />
        <NavLink label="Need help?" icon={helpIcon} />
      </>
    }
  />
))
