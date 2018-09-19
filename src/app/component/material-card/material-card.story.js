import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MaterialCard from '.'
import Price from '../price'
import SelectField from '../select-field'
import SelectMenu from '../select-menu'
import Info from '../info'
import Headline from '../headline'
import Paragraph from '../paragraph'

import HandleValue from '../../../../stories/util/handle-value'
import {selectMenuColorValues} from '../../../../stories/util/data'

const colorMenu = <SelectMenu values={selectMenuColorValues} />
const price = <Price value="$19.99" prefix="From" />
const colorSelect = (
  <HandleValue>
    <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
  </HandleValue>
)

const info = (
  <Info modifiers={['minor']}>
    <Headline modifiers={['s']} label="Headline" />
    <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Paragraph>
  </Info>
)

storiesOf('Material Card', module)
  .add('default', () => (
    <MaterialCard
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('with colorSelect', () => (
    <MaterialCard
      modifiers={['tall']}
      title="Polyamide"
      description="Best all-round material"
      price={price}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('without image', () => (
    <MaterialCard
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('alternative label', () => (
    <MaterialCard
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
      selectLabel="Checkout"
    />
  ))
  .add('selected', () => (
    <MaterialCard
      selected
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('loading', () => (
    <MaterialCard
      loading
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      onSelectClick={action('onSelectClick')}
    />
  ))
  .add('disabled button', () => (
    <MaterialCard
      loading
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
    />
  ))
  .add('single color', () => {
    const colorSelectConstant = (
      <SelectField modifiers={['compact']} value={selectMenuColorValues[0]} />
    )
    return (
      <MaterialCard
        shipping="2-5 days"
        title="Polyamide"
        subline="Solid, raw"
        price={price}
        image="http://placehold.it/260x170/cccccc"
        onMoreClick={action('onMoreClick')}
        colorSelect={colorSelectConstant}
        onSelectClick={action('onSelectClick')}
      />
    )
  })
  .add('unavailable', () => (
    <MaterialCard
      unavailable
      title="Polyamide"
      description="Best all-round material"
      price={price}
      info={info}
      image="http://placehold.it/260x170/cccccc"
      onMoreClick={action('onMoreClick')}
      colorSelect={colorSelect}
      onSelectClick={action('onSelectClick')}
    />
  ))
