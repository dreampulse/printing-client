import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import range from 'lodash/range'

import MaterialCardList from '../../src/app/component/material-card-list'
import MaterialCard from '../../src/app/component/material-card'
import Price from '../../src/app/component/price'
import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

const price = <Price value="$19.99" prefix="From" />

const info = (
  <Info modifiers={['minor']}>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

const card = ({title = 'Polyamide'}) => (
  <MaterialCard
    title={title}
    subline="Solid, raw"
    description="Best all-round material"
    price={price}
    info={info}
    image="http://placehold.it/260x170/cccccc"
    onSelectClick={action('onSelectClick')}
  />
)

storiesOf('Material Card List', module).add('default', () => (
  <MaterialCardList>
    {range(8).map(index => card({title: `Polyamide ${index + 1}`}))}
  </MaterialCardList>
))
