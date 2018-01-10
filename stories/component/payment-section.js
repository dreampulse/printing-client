import React from 'react'
import {storiesOf} from '@storybook/react'

import PaymentSection from '../../src/app/component/payment-section'
import Button from '../../src/app/component/button'

import creditCardIcon from '../../src/asset/icon/credit-card.svg'
import paypalIcon from '../../src/asset/icon/paypal.svg'

storiesOf('Payment Section', module).add('default', () => (
  <PaymentSection
    subtotal="$245.25"
    shippingPrice="$50.00"
    shippingName="DHL"
    vat="$50.00"
    total="$345.00"
    termsLink="https://all3dp.com/3dp-price-comparison-terms-of-service/"
    contactLink="mailto:contact@all3dp.com"
    getInTouchLink="mailto:contact@all3dp.com"
  >
    <Button modifiers={['block']} icon={creditCardIcon} label="Pay by credit card" />
    <Button modifiers={['block']} icon={paypalIcon} label="Pay with Paypal" />
  </PaymentSection>
))
