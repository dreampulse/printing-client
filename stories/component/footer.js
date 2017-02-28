import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Footer from 'Component/footer'
import Link from 'Component/link'

storiesOf('Footer', module)
  .add('default', () => (
    <Footer copyline="© Copyright 2017 ALL3DP GmbH">
      <Link label="Terms and conditions" href="#" onClick={action('click')} />
      <Link label="Imprint" href="#" onClick={action('click')} />
    </Footer>
  ))
