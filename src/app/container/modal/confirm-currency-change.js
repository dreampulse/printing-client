// @flow

import React from 'react'
import {connect} from 'react-redux'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'

const ConfirmCurrencyChangeModal = ({currency, onUpdateCurrency, onClose}) => {
  const headline = <Headline label="Confirmation necessary" modifiers={['l', 'warning']} />
  const buttons = [
    <Button label="Cancel" onClick={() => onClose()} />,
    <Button
      label="Confirm"
      modifiers={['text']}
      onClick={() => {
        onUpdateCurrency(currency, true)
        onClose()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph modifiers={['strong']}>
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
  onUpdateCurrency: coreActions.updateCurrency,
  onClose: modalActions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCurrencyChangeModal)
