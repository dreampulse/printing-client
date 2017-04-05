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

import {
  uploadFiles,
  changeIndividualQuantity,
  changeUnit
} from 'Action/model'

const UploadSection = ({
  models,
  onUploadFiles,
  uploadedModels,
  selectedUnit,
  onChangeIndividualQuantity,
  onChangeUnit
}) => {
  const onUpload = (files) => {
    onUploadFiles(toArray(files))
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
        label="Drag 3D files here or"
        linkLabel="select files"
        accept=".stl"
        onChange={onUpload}
      />
      {uploadedModels.length > 0 && (
        <ModelItemList>
          {uploadedModels.map((model) => {
            if (model.error) {
              // TODO: on delete handler
              return (
                <ModelItemError
                  key={model.fileId}
                  title="Upload failed"
                  subline={model.error}
                />
              )
            }

            if (!model.uploadFinished) {
              // TODO: on delete handler
              return (
                <ModelItemLoad
                  key={model.fileId}
                  status={model.progress}
                  title="Uploading"
                  subline={model.name}
                />
              )
            }

            if (!models[model.modelId].checkStatusFinished) {
              // TODO: on delete handler
              return (
                <ModelItemLoad
                  key={model.fileId}
                  title="Processing"
                  subline={model.name}
                />
              )
            }

            // TODO: on delete handler
            // TODO: subline
            return (
              <ModelItem
                key={model.fileId}
                imageSource={model.thumbnailUrl}
                quantity={models[model.modelId].quantity}
                title={model.name}
                subline="TODO"
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
    </Section>
  )
}

const mapStateToProps = state => ({
  uploadedModels: state.model.uploadedModels,
  models: state.model.models,
  selectedUnit: state.model.selectedUnit
})

const mapDispatchToProps = {
  onUploadFiles: uploadFiles,
  onChangeIndividualQuantity: changeIndividualQuantity,
  onChangeUnit: changeUnit
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(UploadSection)
