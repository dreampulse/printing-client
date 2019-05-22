import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import ModelUploadList from '.'
import UploadModelItem from '../upload-model-item'
import UploadModelItemError from '../upload-model-item-error'
import UploadModelItemLoad from '../upload-model-item-load'

storiesOf('ModelUploadList', module)
  .add('default', () => (
    <ModelUploadList>
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
    </ModelUploadList>
  ))
  .add('single item', () => (
    <ModelUploadList>
      <UploadModelItem
        id="item-1"
        imageSource="http://placehold.it/130x98"
        title="model_item.stl"
        subline="42 x 42 x 42 mm"
      />
    </ModelUploadList>
  ))
