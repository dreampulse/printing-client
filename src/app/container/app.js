import React, {Component} from 'react'
import {connect} from 'react-redux'

import { upload, modelUploaded } from '../action/model'
import { createPriceRequest } from '../action/price'

import Upload from '../component/upload'
import Headline from '../component/headline'
import Button from '../component/button'


const App = ({onUpload, onUploaded, onGetPrice}) => (
  <div>
    <Headline label='Printing Engine Test Client' />
    <Upload label='Upload a model' onUpload={onUpload} onUploaded={onUploaded} />

    <Button label='Get Price' onClick={onGetPrice} />

    <div>Price</div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = {
  onUpload: upload,
  onUploaded: modelUploaded,
  onGetPrice: createPriceRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
