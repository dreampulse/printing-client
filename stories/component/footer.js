import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Footer from 'Component/footer'
import Link from 'Component/link'

storiesOf('Footer', module).add('default', () => (
  <Footer copyline="© Copyright 2017 ALL3DP GmbH">
    <Link label="Terms and conditions" href="#" onClick={action('click')} />
    <Link label="Imprint" href="#" onClick={action('click')} />
  </Footer>
))
