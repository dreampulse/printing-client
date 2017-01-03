import React from 'react'
import { connect } from 'react-redux'

import Main from '../component/main'
import Upload from '../component/upload'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'

import { selectMaterial } from '../action/material'
import { upload, modelUploaded } from '../action/model'

const Model = ({ onUpload, onUploaded, materials, onSelectedMaterial }) => {
  const UploadSection = () => (
    <section>
      <SectionHeadline label='1. Upload files' />
      <Upload label='Upload a model' onUpload={onUpload} onUploaded={onUploaded} />
    </section>
  )

  const MaterialSection = () => (
    <section>
      <SectionHeadline label='2. Choose a material' />
      <MaterialSelect />
    </section>
  )

  const MaterialSelect = () => (
    <select disabled={!materials} onChange={onSelectedMaterial}>
      <option>Select material</option>
      {materials && Object.keys(materials).map(k =>
        <option value={k} key={k}>{materials[k].name}</option>
      )}
    </select>
  )

  return (
    <Main>
      <Headline label='Model config' modifiers={['xl']} />
      <UploadSection />
      <MaterialSection />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  materials: state.material.materials
})

const mapDispatchToProps = {
  onUpload: upload,
  onUploaded: modelUploaded,
  onSelectedMaterial: selectMaterial
}

export default connect(mapStateToProps, mapDispatchToProps)(Model)
