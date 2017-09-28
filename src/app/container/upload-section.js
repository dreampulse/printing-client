import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import toArray from 'lodash/toArray'

import Section from 'Component/section'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Headline from 'Component/headline'
import RadioButtonGroup from 'Component/radio-button-group'
import RadioButton from 'Component/radio-button'
import UploadArea from 'Component/upload-area'
import ModelItem from 'Component/model-item'
import ModelItemLoad from 'Component/model-item-load'
import ModelItemError from 'Component/model-item-error'
import ModelItemList from 'Component/model-item-list'
import LabeledField from 'Component/labeled-field'
import Button from 'Component/button'

import {
  uploadFiles,
  deleteFile,
  changeIndividualQuantity,
  changeUnit
} from 'Action/model'
import {
  createConfiguration
} from 'Action/configuration'
import {formatDimensions} from 'Lib/formatter'

const UploadSection = ({
  configurationId,
  models,
  onUploadFiles,
  onDeleteFile,
  selectedUnit,
  features,
  onChangeIndividualQuantity,
  onChangeUnit,
  onCreateConfiguration
}) => {
  const onUpload = (files) => {
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
        label="Drag .STL files here or"
        linkLabel="select files"
        accept=".stl"
        onChange={onUpload}
      />
      {models.length > 0 && (
        <ModelItemList>
          {models.map((model) => {
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

                onDelete={() => onDeleteFile(model.fileId)}
                subline={formatDimensions(
                  model.dimensions,
                  model.fileUnit
                )}

                onQuantityChange={
                  value => onChangeIndividualQuantity({
                    quantity: value,
                    modelId: model.modelId
                  })
                }
              />
            )
          })}
        </ModelItemList>
      )}
      {features.share && models.length > 0 && !configurationId && (
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
  onCreateConfiguration: createConfiguration
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(UploadSection)
