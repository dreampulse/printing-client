import React from 'react'
import {connect} from 'react-redux'

import { upload, modelUploaded } from '../action/model'
import { createPriceRequest } from '../action/price'
import { createShoppingCart } from '../action/cart'

import Main from '../component/main'
import Upload from '../component/upload'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'
import Button from '../component/button'

const App = ({
  onUpload,
  onUploaded,
  onGetPrice,
  onGetShoppingCart,
  isUploadFinished,
  price,
  cartPrice
}) => {
  const UploadSection = () => (
    <section>
      <SectionHeadline label='Select a file' />
      <Upload label='Upload a model' onUpload={onUpload} onUploaded={onUploaded} />
    </section>
  )

  const GetPriceSection = () => (
    isUploadFinished ? (
      <section>
        <SectionHeadline label='Get price for the model' />
        <Button label='Get Price' onClick={onGetPrice} />
        {price ? <pre>{JSON.stringify(price, null, 2)}</pre> : null}
      </section>
    ) : null
  )

  const GetShoppingCart = () => (
    price ? (
      <section>
        <SectionHeadline label='Create shopping cart' />
        <Button label='Get cart price' onClick={onGetShoppingCart} />
        {cartPrice ? <pre>{JSON.stringify(cartPrice, null, 2)}</pre> : null}
      </section>
    ) : null
  )

  return (
    <Main>
      <Headline label='Printing Engine Test Client' modifiers={['xl']} />
      <UploadSection />
      <GetPriceSection />
      <GetShoppingCart />
    </Main>
  )
}

const mapStateToProps = (state, ownProps) => ({
  price: state.price.price,
  isUploadFinished: state.model.isUploadFinished,
  cartPrice: state.cart.cartPrice
})

const mapDispatchToProps = {
  onUpload: upload,
  onUploaded: modelUploaded,
  onGetPrice: createPriceRequest,
  onGetShoppingCart: createShoppingCart
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
