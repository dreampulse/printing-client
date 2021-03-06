import React from 'react'
import {connect} from 'react-redux'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'

const ConfirmCurrencyChangeModal = ({currency, updateCurrency, closeModal}) => {
  const headline = <Headline label="Confirmation necessary" size="l" warning />
  const buttons = [
    <Button key="cancel" label="Cancel" onClick={() => closeModal()} />,
    <Button
      key="confirm"
      label="Confirm"
      text
      onClick={() => {
        updateCurrency(currency, true)
        closeModal()
      }}
    />
  ]

  return (
    <Modal headline={headline} buttons={buttons}>
      <Paragraph strong>
        Do you really want to change the currency to <strong>{currency}</strong>?
      </Paragraph>
      <Paragraph>
        By changing the currency you have to configure all models in your cart again.
      </Paragraph>
    </Modal>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  updateCurrency: coreActions.updateCurrency,
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCurrencyChangeModal)
