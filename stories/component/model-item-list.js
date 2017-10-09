import React from 'react'
import {storiesOf} from '@storybook/react'

import ModelItem from 'Component/model-item'
import ModelItemError from 'Component/model-item-error'
import ModelItemLoad from 'Component/model-item-load'
import ModelItemList from 'Component/model-item-list'

storiesOf('Model Item List', module)
  .add('default', () => (
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
      <ModelItemError
        title="Upload failed"
        subline="This is why"
      />
      <ModelItemLoad
        status={0.4}
        title="Uploading"
        subline="model_item_title.stl"
      />
    </ModelItemList>
  ))
