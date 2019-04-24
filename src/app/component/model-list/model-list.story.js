import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import ModelList from '.'
import Button from '../button'
import NumberField from '../number-field'
import ButtonBar from '../button-bar'
import ModelItem from '../model-item'
import SelectField from '../select-field'

import placeholderIcon from '../../../asset/icon/placeholder.svg'
import deleteIcon from '../../../asset/icon/delete.svg'

import HandleValue from '../../../../stories/util/handle-value'

const primaryActions = () => <Button label="Choose Material…" />
const secondaryActions = () => [
  <NumberField key="quantity" value={42} />,
  <Button icon={deleteIcon} key="delete" />
]
const buttonBar = () => (
  <ButtonBar>
    <Button icon={placeholderIcon} iconOnly />
    <Button icon={placeholderIcon} iconOnly />
    <Button icon={placeholderIcon} iconOnly />
  </ButtonBar>
)
const color = () => (
  <SelectField
    modifiers={['compact']}
    value={{value: 'item2', colorValue: 'ff0000', label: 'Color'}}
  />
)

storiesOf('Model List', module).add('default', () => (
  <HandleValue initialValue={[]} valueName="checkedIds" onChangeName="onChangeCheckedIds">
    <ModelList primaryActions={primaryActions()} secondaryActions={secondaryActions()}>
      {range(0, 5).map(index => (
        <ModelItem
          key={index}
          id={String(index)}
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
        />
      ))}
    </ModelList>
  </HandleValue>
))
