// @flow

import React from 'react'

import {openIntercom} from '../service/intercom'

import Footer from '../component/footer'
import Link from '../component/link'

const FooterPartial = () => (
  <Footer copyline="© 2018 All3DP">
    <Link
      label="Contact Us"
      href="#"
      onClick={event => {
        event.preventDefault()
        openIntercom()
      }}
    />
    <Link
      label="Terms and conditions"
      target="_blank"
      href="https://all3dp.com/3dp-price-comparison-terms-of-service/"
    />
    <Link label="Imprint" target="_blank" href="https://all3dp.com/terms-of-use/#imprint" />
  </Footer>
)

export default FooterPartial
