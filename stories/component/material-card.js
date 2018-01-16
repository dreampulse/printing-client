import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import MaterialCard from '../../src/app/component/material-card'
import Price from '../../src/app/component/price'
import SelectField from '../../src/app/component/select-field'
import SelectMenu from '../../src/app/component/select-menu'
import Info from '../../src/app/component/info'
import Headline from '../../src/app/component/headline'
import Paragraph from '../../src/app/component/paragraph'

import HandleValue from '../util/handle-value'
import {selectMenuColorValues} from '../util/data'

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
