import React, {Fragment} from 'react'
import {storiesOf} from '@storybook/react'

import NavBar from '../../src/app/component/nav-bar'
import Button from '../../src/app/component/button'
import IconLink from '../../src/app/component/icon-link'
import Logo from '../../src/app/component/logo'
import ProviderProgressBar from '../../src/app/component/provider-progress-bar'

import helpIcon from '../../src/asset/icon/help.svg'
import cartIcon from '../../src/asset/icon/cart.svg'

storiesOf('Nav Bar', module).add('default', () => (
  <NavBar
    leftContent={<Logo />}
    rightContent={
      <Fragment>
        <ProviderProgressBar currentStep={2} totalSteps={6} />
        <Button modifiers={['invert', 'compact']} label="Upload" />
        <IconLink modifiers={['invert']} icon={cartIcon} cartCount={99} />
        <IconLink modifiers={['invert']} icon={helpIcon} />
      </Fragment>
    }
  />
))
