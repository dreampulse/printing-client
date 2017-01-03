import React from 'react'
import { connect } from 'react-redux'

import Main from '../component/main'
import Upload from '../component/upload'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'

import { upload, modelUploaded } from '../action/model'

const Model = ({ onUpload, onUploaded }) => {
  const UploadSection = () => (
    <section>
      <SectionHeadline label='Select a file' />
      <Upload label='Upload a model' onUpload={onUpload} onUploaded={onUploaded} />
    </section>
  )

  return (
    <Main>
      <Headline label='Upload files' modifiers={['xl']} />
      <UploadSection />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = {
  onUpload: upload,
  onUploaded: modelUploaded
}

export default connect(mapStateToProps, mapDispatchToProps)(Model)
