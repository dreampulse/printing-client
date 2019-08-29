import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withState} from '@dump247/storybook-state'

import CartModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'
import NumberField from '../number-field'
import ProviderName from '../provider-name'

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
    <Button
      icon={placeholderIcon}
      label="Edit material"
      tiny
      minor
      classNames={['u-hide-mobile', 'u-hide-tablet']}
    />
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
      provider={<ProviderName vendorId="imaterialise" />}
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
        provider={<ProviderName vendorId="imaterialise" />}
        buttonsLeft={leftButtonBar()}
        buttonsRight={rightButtonBar()}
        selected={store.state.selected}
        onSelect={selected => store.set({selected})}
        onPreviewImageClick={action('onPreviewImageClick')}
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
