import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import ModelList from '.'
import Button from '../button'
import ButtonBar from '../button-bar'
import CartModelItem from '../cart-model-item'
import NumberField from '../number-field'

import placeholderIcon from '../../../asset/icon/placeholder.svg'
import deleteIcon from '../../../asset/icon/delete.svg'

import HandleValue from '../../../../stories/util/handle-value'
import ProviderName from '../provider-name'

const actions = () => [
  <Button icon={deleteIcon} iconOnly key="delete" />,
  <Button tiny minor label="Edit material" key="edit" />
]
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

storiesOf('ModelList', module).add('default', () => (
  <HandleValue initialValue={[]} valueName="checkedIds" onChangeName="onChangeCheckedIds">
    <ModelList
      actions={actions()}
      selectLabel="Select all files"
      deselectLabel="Deselect all files"
    >
      {range(0, 5).map(index => (
        <CartModelItem
          key={index}
          id={`${index}`}
          imageSource="http://placehold.it/180x180"
          title="model_item_title_can_be_long_and_gets_truncated.stl"
          price="26.44€"
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
      ))}
    </ModelList>
  </HandleValue>
))
