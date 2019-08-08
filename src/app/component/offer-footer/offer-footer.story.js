import React from 'react'
import {storiesOf} from '@storybook/react'

import OfferFooter from '.'
import DescriptionList from '../description-list'
import Link from '../link'

storiesOf('OfferFooter', module).add('default', () => (
  <OfferFooter>
    <DescriptionList block>
      <dt>
        <strong>Best Price</strong>
      </dt>
      <dd>
        <strong className="u-font-size-l">- €</strong>
      </dd>
    </DescriptionList>
    Includes shipping costs to <Link label="Munich, Germany" />.
  </OfferFooter>
))
