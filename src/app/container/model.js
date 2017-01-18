import React from 'react'
import {connect} from 'react-redux'

import Main from '../component/main'
import Button from '../component/button'
import Upload from '../component/upload'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'
import LoadingIndicator from '../component/loading-indicator'

import {goToVendor} from '../action/navigation'
import {selectMaterial} from '../action/material'
import {upload, modelUploaded} from '../action/model'

const Model = ({
  onUpload,
  onUploaded,
  isUploading,
  materials,
  onSelectedMaterial,
  selectedMaterial,
  onGoToVendor,
  isConfigured
}) => {
  const UploadSection = () => (
    <section>
      <SectionHeadline label="1. Upload files" />
      <Upload label="Upload a model" onUpload={onUpload} onUploaded={onUploaded} />
      <Loading />
    </section>
  )

  const Loading = () => (
    isUploading ? <LoadingIndicator modifiers={['l']} /> : null
  )

  const MaterialSection = () => (
    <section>
      <SectionHeadline label="2. Choose a material" />
      <MaterialSelect />
    </section>
  )

  const MaterialSelect = () => (
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
  isUploading: state.model.modelId && !state.model.isUploadFinished,
  isConfigured: state.model.isUploadFinished && state.material.selected,
  materials: state.material.materials,
  selectedMaterial: state.material.selected
})

const mapDispatchToProps = {
  onUpload: upload,
  onUploaded: modelUploaded,
  onSelectedMaterial: selectMaterial,
  onGoToVendor: goToVendor
}

export default connect(mapStateToProps, mapDispatchToProps)(Model)
