import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import ModelItem from '../../src/app/component/model-item'
import CheckoutModelList from '../../src/app/component/checkout-model-list'
import SelectField from '../../src/app/component/select-field'

const color = () => (
  <SelectField
    modifiers={['compact']}
    value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
  />
)

storiesOf('Checkout Model List', module).add('default', () => (
  <CheckoutModelList>
    {range(5).map(index => (
      <ModelItem
        key={index}
        modifiers={['read-only']}
        id="some-id"
        imageSource="http://placehold.it/180x180"
        title="model_item_title.stl"
        subline="42 x 42 x 42 mm"
        quantity={1}
        price="80.99€"
        deliveryTime="2-5 Days"
        shippingTime="2-5 Days"
        shippingMethod="DHL Express"
        providerName="shapeways"
        materialName="Metal, polished"
        providerMaterialName="Polyamide (SLS)"
        color={color()}
      />
    ))}
  </CheckoutModelList>
))
