import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs/react'

import AppLayoutContainer from '../../src/app/container-next/app-layout'
import UploadPage from '../../src/app/container-next/upload-page'

const models = {
  modelsEmpty: [],
  modelsUploading: [
    {
      id: 'file-id-0',
      type: 'UPLOADING',
      fileName: 'some-file-name',
      progress: 0.7
    },
    {
      id: 'file-id-1',
      type: 'ERROR',
      errorMessage: 'some-error'
    },
    {
      id: 'file-id-2',
      type: 'MODEL',
      fileName: 'some-file-name',
      dimensions: {
        x: 23.3,
        y: 42.2,
        z: 0.815
      },
      thumbnailUrl: 'http://placehold.it/130x98',
      unit: 'mm',
      quantity: 1
    }
  ],
  modelsCompleted: [
    {
      id: 'model-id-0',
      type: 'MODEL',
      fileName: 'some-file-name',
      dimensions: {
        x: 23.3,
        y: 42.2,
        z: 0.815
      },
      thumbnailUrl: 'http://placehold.it/130x98',
      unit: 'mm',
      quantity: 1
    },
    {
      id: 'model-id-1',
      type: 'MODEL',
      fileName: 'some-file-name',
      dimensions: {
        x: 23.3,
        y: 42.2,
        z: 0.815
      },
      thumbnailUrl: 'http://placehold.it/130x98',
      unit: 'mm',
      quantity: 1
    }
  ]
}

storiesOf('Container.UploadPage', module)
  .addDecorator(withKnobs)
  .add('modelsEmpty', () => (
    <UploadPage
      models={models.modelsEmpty}
      onDeleteFile={action('onDeleteFile')}
      onDeleteModel={action('onDeleteModel')}
      onChangeIndividualQuantity={action('onChangeIndividualQuantity')}
    />
  ))
  .add('modelsUploading', () => (
    <UploadPage
      models={models.modelsUploading}
      onDeleteFile={action('onDeleteFile')}
      onDeleteModel={action('onDeleteModel')}
      onChangeIndividualQuantity={action('onChangeIndividualQuantity')}
    />
  ))
  .add('modelsCompleted', () => (
    <UploadPage
      models={models.modelsCompleted}
      onDeleteFile={action('onDeleteFile')}
      onDeleteModel={action('onDeleteModel')}
      onChangeIndividualQuantity={action('onChangeIndividualQuantity')}
    />
  ))
