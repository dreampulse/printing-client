import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import InputField from '../../component/input-field'

import * as modalActions from '../../action/modal'

const INPUT_ID = 'share-cart-input'

const ShareCartModal = ({cartUrl, closeModal}) => (
  <Modal
    headline={<Headline label="Share cart" size="l" />}
    buttons={[
      <Button
        label="Copy to clipboard and Close"
        key="ok"
        onClick={() => {
          global.document.getElementById(INPUT_ID).focus()
          global.document.execCommand('copy')
          closeModal()
        }}
      />
    ]}
    onClose={() => closeModal()}
  >
    <Paragraph>Cart has been created with the following URL.</Paragraph>
    <InputField
      id={INPUT_ID}
      label="URL to Cart"
      value={cartUrl}
      autoFocus
      onFocus={event => event.target.select()}
    />
  </Modal>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({cartId}) => ({
    cartUrl: `${global.location.origin}/cart/${cartId}?utm_campaign=shareable_cart`
  }))
)(ShareCartModal)
