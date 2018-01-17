import React from 'react'
import {storiesOf} from '@storybook/react'

import UploadModelItem from '../../src/app/component/upload-model-item'

storiesOf('Upload Model Item', module)
  .add('default', () => (
    <UploadModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      quantity={1}
    />
  ))
  .add('no subline', () => (
    <UploadModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      quantity={1}
    />
  ))
