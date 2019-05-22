import React from 'react'
import {connect} from 'react-redux'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'

const ConfirmCurrencyChangeModal = ({currency, updateCurrency, closeModal}) => {
  const headline = <Headline label="Confirmation necessary" modifiers={['l', 'warning']} />
  const buttons = [
    <Button label="Cancel" onClick={() => closeModal()} />,
    <Button
      label="Confirm"
      text
      onClick={() => {
        updateCurrency(currency, true)
        closeModal()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph strong>
        Do you really want to change the currency to <strong>{currency}</strong>?
      </Paragraph>
      <Paragraph>
        By changing the currency you have to choose the materials for all models in your cart again.
      </Paragraph>
    </Overlay>
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
