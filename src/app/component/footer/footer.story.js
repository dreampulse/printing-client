import React from 'react'
import {storiesOf} from '@storybook/react'

import Footer from '.'
import Link from '../link'

storiesOf('Footer', module).add('default', () => (
  <Footer copyline="© 2019 All3DP">
    <Link label="Terms and conditions" href="#" />
    <Link label="Imprint" href="#" />
  </Footer>
))
