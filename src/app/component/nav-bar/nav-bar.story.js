import React, {Fragment} from 'react'
import {storiesOf} from '@storybook/react'

import NavBar from '.'
import Button from '../button'
import IconLink from '../icon-link'
import Logo from '../logo'
import ProviderProgressBar from '../provider-progress-bar'

import helpIcon from '../../../asset/icon/help.svg'
import cartIcon from '../../../asset/icon/cart.svg'

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
