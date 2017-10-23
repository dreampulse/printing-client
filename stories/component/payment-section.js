import React from 'react'
import {storiesOf} from '@storybook/react'

import PaymentSection from 'Component/payment-section'
import Button from 'Component/button'
import Link from 'Component/link'

import creditCardIcon from 'Icon/credit-card.svg'
import paypalIcon from 'Icon/paypal.svg'

storiesOf('Payment Section', module).add('default', () => (
  <PaymentSection subtotal="$245.25" shipping="$50.00" vat="$50.00" total="$345.00">
    <Button modifiers={['block']} icon={creditCardIcon} label="Pay by credit card" />
    <Button modifiers={['block']} icon={paypalIcon} label="Pay with Paypal" />
    <Link label="Terms of service" />
  </PaymentSection>
))
