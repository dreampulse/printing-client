import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Footer from '.'
import Link from '../link'

storiesOf('Footer', module).add('default', () => (
  <Footer copyline="© 2019 All3DP">
    <Link label="Terms and conditions" href="#" onClick={action('click')} />
    <Link label="Imprint" href="#" onClick={action('click')} />
  </Footer>
))
