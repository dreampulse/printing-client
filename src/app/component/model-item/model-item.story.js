import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'
import SelectField from '../select-field'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button icon={placeholderIcon} iconOnly onClick={action('click')} />
    <Button icon={placeholderIcon} iconOnly onClick={action('click')} />
    <Button icon={placeholderIcon} iconOnly onClick={action('click')} />
  </ButtonBar>
)

const color = () => (
  <SelectField
    modifiers={['compact']}
    value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
  />
)

storiesOf('Model Item', module)
  .add('default', () => (
    <ModelItem
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      quantity={1}
      price="80.99€"
      deliveryTime="2-5 Days"
      shippingMethod="DHL Express"
      providerId="shapeways"
      materialName="Metal, polished"
      providerMaterialName="Polyamide (SLS)"
      color={color()}
      buttonBar={buttonBar()}
      onMagnify={action('magnify')}
    />
  ))
  .add('read-only', () => (
    <ModelItem
      modifiers={['read-only']}
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      quantity={1}
      price="80.99€"
      deliveryTime="2-5 Days"
      shippingMethod="DHL Express"
      providerId="shapeways"
      materialName="Metal, polished"
      providerMaterialName="Polyamide (SLS)"
      color={color()}
      onMagnify={action('magnify')}
    />
  ))
