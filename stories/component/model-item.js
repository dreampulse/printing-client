import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import ModelItem from '../../src/app/component/model-item'
import Button from '../../src/app/component/button'
import ButtonBar from '../../src/app/component/button-bar'
import SelectField from '../../src/app/component/select-field'

import placeholderIcon from '../../src/asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button label="Button" modifiers={['tiny', 'minor']} onClick={action('click')} />
    <Button
      icon={placeholderIcon}
      modifiers={['tiny', 'icon-only', 'minor']}
      onClick={action('click')}
    />
    <Button
      icon={placeholderIcon}
      modifiers={['tiny', 'icon-only', 'minor']}
      onClick={action('click')}
    />
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
