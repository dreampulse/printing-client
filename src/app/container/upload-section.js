import React from 'react'
import {compose} from 'recompose'
import toArray from 'lodash/toArray'

import {formatDimensions} from '../lib/formatter'

import Section from '../component/section'
import Grid from '../component/grid'
import Column from '../component/column'
import Headline from '../component/headline'
import RadioButtonGroup from '../component/radio-button-group'
import RadioButton from '../component/radio-button'
import UploadArea from '../component/upload-area'
import ModelItem from '../component/model-item'
import ModelItemLoad from '../component/model-item-load'
import ModelItemError from '../component/model-item-error'
import ModelItemList from '../component/model-item-list'
import LabeledField from '../component/labeled-field'
import Button from '../component/button'

import {uploadFiles, deleteFile, changeIndividualQuantity, changeUnit} from '../action/model'
import * as modelViewerAction from '../action-next/model-viewer'
import {createConfiguration} from '../action/configuration'

import {connectLegacy} from './util/connect-legacy'
import {getFeatures} from './util/feature'

const UploadSection = ({
  configurationId,
  models,
  onUploadFiles,
  onDeleteFile,
  selectedUnit,
  features,
  onChangeIndividualQuantity,
  onChangeUnit,
  onCreateConfiguration,
  onMagnifyModel
}) => {
  const onUpload = files => {
    onUploadFiles(toArray(files), features)
  }

  return (
    <Section id="section-upload">
      <Grid>
        <Column md={8}>
          <Headline label="1. Upload files" modifiers={['xl']} />
        </Column>
        <Column md={4} classNames={['u-margin-bottom']}>
          <LabeledField label="Unit:" classNames={['u-float-right']}>
            <RadioButtonGroup
              name="unit"
              value={selectedUnit}
              onChange={unit => onChangeUnit({unit})}
            >
              <RadioButton value="mm" />
              <RadioButton value="cm" />
              <RadioButton value="in" />
            </RadioButtonGroup>
          </LabeledField>
        </Column>
      </Grid>
      <UploadArea
        label="Drag any 3D files here or"
        linkLabel="select files"
        description="Supported file formats: STL, OBJ, WRL, SKP, DAE, 3DS, IGS, FBX, PLY, X3D, STP, PRT, …"
        accept="*"
        onChange={onUpload}
      />
      {models.length > 0 && (
        <ModelItemList>
          {models.map(model => {
            if (model.error) {
              return (
                <ModelItemError
                  key={model.fileId}
                  title="Upload failed"
                  subline={model.error.message}
                  onDelete={() => onDeleteFile(model.fileId)}
                />
              )
            }

            if (model.progress < 1) {
              return (
                <ModelItemLoad
                  key={model.fileId}
                  status={model.progress}
                  title="Uploading"
                  subline={model.fileName}
                  onDelete={() => onDeleteFile(model.fileId)}
                />
              )
            }

            if (!model.uploadFinished) {
              return (
                <ModelItemLoad
                  key={model.fileId}
                  title="Processing"
                  subline={model.fileName}
                  onDelete={() => onDeleteFile(model.fileId)}
                />
              )
            }

            return (
              <ModelItem
                key={model.fileId}
                imageSource={model.thumbnailUrl}
                quantity={model.quantity}
                title={model.fileName}
                subline={formatDimensions(model.dimensions, model.fileUnit)}
                onDelete={() => onDeleteFile(model.fileId)}
                onQuantityChange={value =>
                  onChangeIndividualQuantity({
                    quantity: value,
                    modelId: model.modelId
                  })}
                onMagnify={() => onMagnifyModel(model.modelId)}
              />
            )
          })}
        </ModelItemList>
      )}
      {features.share &&
        models.length > 0 &&
        !configurationId && (
          <Button
            label="Share compilation"
            modifiers={['text']}
            classNames={['u-float-right']}
            onClick={() => onCreateConfiguration()}
          />
        )}
    </Section>
  )
}

const mapStateToProps = state => ({
  configurationId: state.configuration.configurationId,
  models: state.model.models,
  selectedUnit: state.model.selectedUnit
})

const mapDispatchToProps = {
  onUploadFiles: uploadFiles,
  onDeleteFile: deleteFile,
  onChangeIndividualQuantity: changeIndividualQuantity,
  onChangeUnit: changeUnit,
  onCreateConfiguration: createConfiguration,
  onMagnifyModel: modelViewerAction.open
}

export default compose(getFeatures, connectLegacy(mapStateToProps, mapDispatchToProps))(
  UploadSection
)
