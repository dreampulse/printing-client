import React from 'react'
import {storiesOf} from '@storybook/react'

import ModelItem from '../../src/app/component/model-item'
import ModelItemError from '../../src/app/component/model-item-error'
import ModelItemLoad from '../../src/app/component/model-item-load'
import ModelItemList from '../../src/app/component/model-item-list'

storiesOf('Model Item List', module).add('default', () => (
  <ModelItemList>
    <ModelItem
      imageSource="http://placehold.it/130x98"
      quantity={1}
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
    />
    <ModelItem
      imageSource="http://placehold.it/130x98"
      quantity={1}
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
    />
    <ModelItemError title="Upload failed" subline="This is why" />
    <ModelItemLoad status={0.4} title="Uploading" subline="model_item_title.stl" />
  </ModelItemList>
))
