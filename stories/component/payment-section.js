import React from 'react'
import {storiesOf} from '@kadira/storybook'

import PaymentSection from '../../src/app/component/info'
import Button from '../../src/app/component/button'

storiesOf('Payment Section', module)
  .add('default', () => (
    <PaymentSection subtotal="$245.25" shipping="$50.00" vat="$50.00" total="$345.00">
      <Button label="Pay by credit card" />
      <Button label="Pay with Paypal" />
    </PaymentSection>
  ))
