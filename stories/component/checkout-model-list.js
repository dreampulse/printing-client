import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'
import {action} from '@storybook/addon-actions'

import ModelItem from '../../src/app/component/model-item'
import CheckoutModelList from '../../src/app/component/checkout-model-list'
import SelectField from '../../src/app/component/select-field'
import Link from '../../src/app/component/link'

import editIcon from '../../src/asset/icon/edit.svg'

const color = () => (
  <SelectField
    modifiers={['compact']}
    value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
  />
)

const editLink = <Link label="edit" href="#" icon={editIcon} onClick={action('edit click')} />

storiesOf('Checkout Model List', module).add('default', () => (
  <CheckoutModelList headline="Your order" editLink={editLink}>
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
