import React from 'react'
import {storiesOf} from '@kadira/storybook'

import PaymentSection from '../../src/app/component/payment-section'
import Button from '../../src/app/component/button'
import Link from '../../src/app/component/link'

import creditCardIcon from '../../src/asset/icon/credit-card.svg'
import paypalIcon from '../../src/asset/icon/paypal.svg'

storiesOf('Payment Section', module)
  .add('default', () => (
    <PaymentSection subtotal="$245.25" shipping="$50.00" vat="$50.00" total="$345.00">
      <Button modifiers={['block']} icon={creditCardIcon} label="Pay by credit card" />
      <Button modifiers={['block']} icon={paypalIcon} label="Pay with Paypal" />
      <Link label="Terms of service" />
    </PaymentSection>
  ))
