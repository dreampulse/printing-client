import React from 'react'
import {storiesOf} from '@storybook/react'

import NavBar from '.'
import Button from '../button'
import Logo from '../logo'
import CartNavLink from '../cart-nav-link'
import NavLink from '../nav-link'

import uploadIcon from '../../../asset/icon/upload.svg'

storiesOf('NavBar', module).add('default', () => (
  <NavBar
    leftContent={<Logo />}
    rightContent={
      <>
        <NavLink label="Upload" icon={uploadIcon} />
        <CartNavLink label="Your Cart" count={6} />
        <Button minor compact label="Need help?" />
      </>
    }
  />
))
