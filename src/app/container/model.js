import React from 'react'
import {connect} from 'react-redux'
import toArray from 'lodash/toArray'

import Main from '../component/main'
import Button from '../component/button'
import Upload from '../component/upload'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'

import {goToVendor} from '../action/navigation'
import {selectMaterial} from '../action/material'
import {uploadFiles} from '../action/model'

const Model = ({
  onUploadFiles,
  materials,
  models,
  onSelectedMaterial,
  selectedMaterial,
  onGoToVendor,
  isConfigured
}) => {
  const onUpload = (files) => {
    onUploadFiles(toArray(files))
  }

  const UploadSection = () => (
    <section>
      <SectionHeadline label="1. Upload files" />
      <Upload onUpload={onUpload} multiple>
        <Button label="upload" />
      </Upload>

      <pre>{JSON.stringify(models, '', 2)}</pre>
    </section>
  )

  const MaterialSection = () => (
    <section>
      <SectionHeadline label="2. Choose a material" />
      <select
        disabled={!materials}
        onChange={e => onSelectedMaterial(e.target.value)}
        value={selectedMaterial}
      >
        <option>Select material</option>
        {materials && Object.keys(materials).map(k =>
          <option value={k} key={k}>{materials[k].name}</option>
        )}
      </select>
    </section>
  )

  return (
    <Main>
      <Headline label="Model config" modifiers={['xl']} />
      <UploadSection />
      <MaterialSection />
      <Button label="Continue" disabled={!isConfigured} onClick={onGoToVendor} />
    </Main>
  )
}

const mapStateToProps = state => ({
  isConfigured: state.model.areAllUploadsFinished && state.material.selected,
  materials: state.material.materials,
  models: state.model.models,
  selectedMaterial: state.material.selected
})

const mapDispatchToProps = {
  onUploadFiles: uploadFiles,
  onSelectedMaterial: selectMaterial,
  onGoToVendor: goToVendor
}

export default connect(mapStateToProps, mapDispatchToProps)(Model)
