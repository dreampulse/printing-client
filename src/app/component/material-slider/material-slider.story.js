import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import range from 'lodash/range'
import shuffle from 'lodash/shuffle'

import {withState} from '../../../../stories/util/state'

import MaterialSlider from '.'
import MaterialCard from '../material-card'
import Price from '../price'
import Container from '../container'
import Button from '../button'

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

const cards = range(14).map(index => card({title: `Polyamide ${index + 1}`}))

storiesOf('Material Slider', module)
  .add('default', () => (
    /* We need the container here to test the max size of the slider */
    <Container>
      <MaterialSlider>
        {range(14).map(index => card({title: `Polyamide ${index + 1}`}))}
      </MaterialSlider>
    </Container>
  ))
  .add(
    'with reset',
    withState({count: 0})(({store}) => (
      <>
        <Container>
          <MaterialSlider>
            {range(store.state.count).map(index => card({title: `Polyamide ${index + 1}`}))}
          </MaterialSlider>
        </Container>

        <Button label="Add card" onClick={() => store.set({count: store.state.count + 1})} />
      </>
    ))
  )
  .add(
    'with no reset',
    withState({count: 0})(({store}) => (
      <>
        <Container>
          <MaterialSlider>{shuffle(cards)}</MaterialSlider>
        </Container>

        <Button
          label={`Shuffel Cards #${store.state.count}`}
          onClick={() => store.set({count: store.state.count + 1})}
        />
      </>
    ))
  )
