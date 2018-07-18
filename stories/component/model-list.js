import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import UploadModelItem from '../../src/app/component/upload-model-item'
import UploadModelItemError from '../../src/app/component/upload-model-item-error'
import UploadModelItemLoad from '../../src/app/component/upload-model-item-load'
import Button from '../../src/app/component/button'
import NumberField from '../../src/app/component/number-field'
import ModelList from '../../src/app/component/model-list'

import deleteIcon from '../../src/asset/icon/delete.svg'

import HandleValue from '../util/handle-value'

const primaryActions = () => <Button label="Choose Material…" />
const secondaryActions = () => [
  <NumberField key="quantity" />,
  <Button modifiers={['minor']} icon={deleteIcon} key="delete" />
]

storiesOf('Model List', module).add('default', () => (
  <HandleValue initialValue={[]} valueName="checkedIds" onChangeName="onChangeCheckedIds">
    <ModelList primaryActions={primaryActions()} secondaryActions={secondaryActions()}>
      {range(0, 5).map(index => (
        <UploadModelItem
          key={index}
          id={String(index)}
          imageSource="http://placehold.it/130x98"
          title={`model_item_${index}.stl`}
          subline="42 x 42 x 42 mm"
        />
      ))}
      <UploadModelItemError title="Upload failed" subline="This is why" />
      <UploadModelItemLoad status={0.4} title="Uploading" subline="model_item_title.stl" />
    </ModelList>
  </HandleValue>
))
