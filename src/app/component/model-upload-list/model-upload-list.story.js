import React from 'react'
import {storiesOf} from '@storybook/react'
import range from 'lodash/range'

import ModelList from '.'
import UploadModelItem from '../upload-model-item'
import UploadModelItemError from '../upload-model-item-error'
import UploadModelItemLoad from '../upload-model-item-load'
import UploadArea from '../upload-area'

storiesOf('ModelUploadList', module)
  .add('default', () => (
    <ModelList
      uploadArea={
        <UploadArea
          label="Drag any 3D files here or"
          linkLabel="select files"
          description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
          accept="*"
        />
      }
    >
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
  ))
  .add('single item', () => (
    <ModelList
      uploadArea={
        <UploadArea
          modifiers={['s']}
          label="Drag any 3D files here or"
          linkLabel="select files"
          description="We support most file formats, but STL and OBJ files generally provide the best results and the lowest prices."
          accept="*"
        />
      }
    >
      <UploadModelItem
        id="item-1"
        imageSource="http://placehold.it/130x98"
        title="model_item.stl"
        subline="42 x 42 x 42 mm"
      />
    </ModelList>
  ))
