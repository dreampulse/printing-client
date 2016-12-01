import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from '../action'

import Upload from '../component/upload'
import Headline from '../component/headline'
import Button from '../component/button'

console.log('-- actions', actions)
const App = ({hello, bar, counter, onUpload, onUploaded, onGetPrice}) => (
  <div>
    <Headline label='Printing Engine Test Client' />
    <Upload label='Upload a model' onUpload={onUpload} onUploaded={onUploaded} />

    <Button label='Get Price' onClick={onGetPrice}/>

    <div>Price</div>
  </div>
)

const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = {
  onUpload: actions.model.upload,
  onUploaded: actions.model.modelUploaded,
  onGetPrice: actions.price.createPriceRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
