import React from 'react'
import {storiesOf} from '@storybook/react'

import UploadModelItem from '../../src/app/component/upload-model-item'
import UploadModelItemError from '../../src/app/component/upload-model-item-error'
import UploadModelItemLoad from '../../src/app/component/upload-model-item-load'
import ModelItemList from '../../src/app/component/model-item-list'

storiesOf('Model Item List', module).add('default', () => (
  <ModelItemList>
    <UploadModelItem
      imageSource="http://placehold.it/130x98"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
    />
    <UploadModelItem
      imageSource="http://placehold.it/130x98"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
    />
    <UploadModelItemError title="Upload failed" subline="This is why" />
    <UploadModelItemLoad status={0.4} title="Uploading" subline="model_item_title.stl" />
  </ModelItemList>
))
