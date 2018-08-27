// @flow

import React from 'react'
import {connect} from 'react-redux'

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'

import {formatLocation} from '../../lib/formatter'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'

const ConfirmLocationChangeModal = ({location, updateLocation, closeModal}) => {
  const headline = <Headline label="Confirmation necessary" modifiers={['l']} />
  const buttons = [
    <Button label="Cancel" modifiers={['text']} onClick={() => closeModal()} />,
    <Button
      label="Confirm"
      onClick={() => {
        updateLocation(location, true)
        closeModal()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph modifiers={['strong']}>
        Do you really want to change your location to <strong>{formatLocation(location)}</strong>?
      </Paragraph>
      <Paragraph>
        By changing the country you have to choose the materials for all models in your cart again.
      </Paragraph>
    </Overlay>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  updateLocation: coreActions.updateLocation,
  closeModal: modalActions.closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmLocationChangeModal)
