import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Footer from '../../src/app/component/footer'
import Link from '../../src/app/component/link'

storiesOf('Footer', module).add('default', () => (
  <Footer copyline="© 2018 All3DP">
    <Link label="Terms and conditions" href="#" onClick={action('click')} />
    <Link label="Imprint" href="#" onClick={action('click')} />
  </Footer>
))
