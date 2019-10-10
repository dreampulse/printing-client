import React from 'react'
import {storiesOf} from '@storybook/react'

import PaymentSection from '.'
import Button from '../button'

import creditCardIcon from '../../../asset/icon/credit-card.svg'
import paypalIcon from '../../../asset/icon/paypal.svg'

storiesOf('PaymentSection', module)
  .add('default', () => (
    <PaymentSection
      subtotal="$245.25"
      shippings={[{label: 'shipping provider', price: '$5.00'}]}
      vat="$50.00"
      total="$345.00"
      childrenLabel="Pay with:"
    >
      <Button block icon={creditCardIcon} label="Pay by credit card" />
      <Button block icon={paypalIcon} label="Pay with Paypal" />
    </PaymentSection>
  ))
  .add('multiple shippings', () => (
    <PaymentSection
      subtotal="$245.25"
      shippings={[
        {label: 'shipping provider 1', price: '$5.00'},
        {label: 'shipping provider 2', price: '$5.30'}
      ]}
      vat="$50.00"
      total="$345.00"
      childrenLabel="Pay with:"
    >
      <Button block icon={creditCardIcon} label="Pay by credit card" />
      <Button block icon={paypalIcon} label="Pay with Paypal" />
    </PaymentSection>
  ))
