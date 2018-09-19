import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import CheckoutModelList from '.'
import ModelItem from '../model-item'
import SelectField from '../select-field'

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
        id="some-id"
        modifiers={['read-only']}
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
      />
    ))}
  </CheckoutModelList>
))
