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

import {uploadFiles} from 'Action/model'

const UploadSection = ({
  onUploadFiles,
  uploadedModels
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
            <RadioButtonGroup name="unit">
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

            if (model.error) {
              // TODO: on delete handler
              return (
                <ModelItemError
                  title="Upload failed"
                  subline={model.error}
                />
              )
            }

            // TODO: quantity management
            // TODO: on delete handler
            // TODO: image
            // TODO: subline
            return (
              <ModelItem
                key={model.fileId}
                imageSource="http://placehold.it/130x98"
                quantity={1}
                title={model.name}
                subline="TODO"
              />
            )
          })}
        </ModelItemList>
      )}
    </Section>
  )
}

const mapStateToProps = state => ({
  uploadedModels: state.model.uploadedModels
})

const mapDispatchToProps = {
  onUploadFiles: uploadFiles
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(UploadSection)
