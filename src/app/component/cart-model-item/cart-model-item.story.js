import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'

import CartModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'
import NumberField from '../number-field'
import ProviderImage from '../provider-image'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const leftButtonBar = () => (
  <ButtonBar l>
    <NumberField value={1} />
  </ButtonBar>
)

const rightButtonBar = () => (
  <ButtonBar l>
    <Button icon={placeholderIcon} iconOnly />
    <Button icon={placeholderIcon} iconOnly />
    <Button icon={placeholderIcon} label="Edit material" tiny minor />
  </ButtonBar>
)

storiesOf('CartModelItem', module)
  .add('default', () => (
    <CartModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      price="26.44€"
      id="someId"
      info={
        <>
          42 x 42 x 42 mm
          <br />
          Standard Resin, Natural & Dyed, Red
        </>
      }
      shippingInfo={
        <>
          Est. delivery time: <strong>11 days</strong>
          <br />
          Deslivery method: <strong>Standard</strong>
        </>
      }
      providerImage={<ProviderImage s slug="imaterialise" name="i.Materialise" />}
      buttonsLeft={leftButtonBar()}
      buttonsRight={rightButtonBar()}
    />
  ))
  .add(
    'selected',
    withState({selected: true}, store => (
      <CartModelItem
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        price="26.44€"
        id="someId"
        info={
          <>
            42 x 42 x 42 mm
            <br />
            Standard Resin, Natural & Dyed, Red
          </>
        }
        shippingInfo={
          <>
            Est. delivery time: <strong>11 days</strong>
            <br />
            Deslivery method: <strong>Standard</strong>
          </>
        }
        providerImage={<ProviderImage s slug="imaterialise" name="i.Materialise" />}
        buttonsLeft={leftButtonBar()}
        buttonsRight={rightButtonBar()}
        selected={store.state.selected}
        onSelect={selected => store.set({selected})}
      />
    ))
  )
  .add('s', () => (
    <CartModelItem
      s
      id="someId"
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      info="42 x 42 x 42 mm"
    />
  ))
