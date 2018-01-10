import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import range from 'lodash/range'

import MaterialSlider from '../../src/app/component/material-slider'
import MaterialCard from '../../src/app/component/material-card'
import Price from '../../src/app/component/price'
import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'
import Container from '../../src/app/component/container'

const price = <Price value="$19.99" prefix="From" />

const info = (
  <Info modifiers={['minor']}>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

const card = ({title = 'Polyamide'}) => (
  <MaterialCard
    key={title}
    title={title}
    description="Best all-round material"
    price={price}
    info={info}
    image="http://placehold.it/260x170/cccccc"
    onSelectClick={action('onSelectClick')}
  />
)

storiesOf('Material Slider', module).add('default', () => (
  /* We need the container here to test the max size of the slider */
  <Container>
    <MaterialSlider>
      {range(14).map(index => card({title: `Polyamide ${index + 1}`}))}
    </MaterialSlider>
  </Container>
))
