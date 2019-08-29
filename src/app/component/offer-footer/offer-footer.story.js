import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import OfferFooter from '.'
import Link from '../link'

storiesOf('OfferFooter', module)
  .add('default', () => (
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
  .add('with onOpenSidebar', () => (
    <OfferFooter
      onOpenSidebar={action('onOpenSidebar')}
      priceLabel="Best Price"
      price="- €"
      subline={
        <>
          Includes shipping costs to <Link label="Munich, Germany" />.
        </>
      }
    />
  ))
