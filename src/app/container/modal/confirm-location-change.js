import React from 'react'
import {connect} from 'react-redux'

import * as modalActions from '../../action/modal'
import * as coreActions from '../../action/core'

import {formatLocation} from '../../lib/formatter'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'

const ConfirmLocationChangeModal = ({location, previousLocation, updateLocation, closeModal}) => {
  const headline = <Headline label="Confirmation necessary" modifiers={['l', 'warning']} />
  const buttons = [
    <Button
      label="Cancel"
      onClick={() => {
        updateLocation({...previousLocation}, true)
        closeModal()
      }}
    />,
    <Button
      label="Confirm"
      text
      onClick={() => {
        updateLocation(location, true)
        closeModal()
      }}
    />
  ]

  return (
    <Modal headline={headline} buttons={buttons} closeable={false}>
      <Paragraph strong>
        Do you really want to change your location to <strong>{formatLocation(location)}</strong>?
      </Paragraph>
      <Paragraph>
        By changing the country you have to customize all models in your cart again.
      </Paragraph>
    </Modal>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  updateLocation: coreActions.updateLocation,
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmLocationChangeModal)
