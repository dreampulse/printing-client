import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import range from 'lodash/range'

import MaterialSlider from '.'
import MaterialCard from '../material-card'
import Price from '../price'
import Container from '../container'

const price = <Price value="$19.99" />

const card = ({title = 'Polyamide'}) => (
  <MaterialCard
    key={title}
    title={title}
    description="Best all-round material"
    price={price}
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
