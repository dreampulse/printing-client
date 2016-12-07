import React from 'react'
import {connect} from 'react-redux'

import { upload, modelUploaded } from '../action/model'
import { createPriceRequest } from '../action/price'

import Upload from '../component/upload'
import Headline from '../component/headline'
import Button from '../component/button'

const App = ({onUpload, onUploaded, onGetPrice, modelId}) => (
  <div>
    <Headline label='Printing Engine Test Client' />
    <Upload label='Upload a model' onUpload={onUpload} onUploaded={onUploaded} />

    {modelId ? <Button label='Get Price' onClick={onGetPrice} /> : null}

  </div>
)

const mapStateToProps = (state, ownProps) => ({
  modelId: state.model.modelId
})

const mapDispatchToProps = {
  onUpload: upload,
  onUploaded: modelUploaded,
  onGetPrice: createPriceRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
