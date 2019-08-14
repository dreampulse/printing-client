import React from 'react'
import {storiesOf} from '@storybook/react'

import OfferFooter from '.'
import Link from '../link'

storiesOf('OfferFooter', module).add('default', () => (
  <OfferFooter
    priceLabel="Best Price"
    price="- €"
    subline={
      <>
        Includes shipping costs to <Link label="Munich, Germany" />.
      </>
    }
  />
))
