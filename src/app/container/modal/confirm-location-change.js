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

const ConfirmLocationChangeModal = ({location, onUpdateLocation, onClose}) => {
  const headline = <Headline label="Confirmation necessary" modifiers={['l', 'warning']} />
  const buttons = [
    <Button label="Cancel" onClick={() => onClose()} />,
    <Button
      label="Confirm"
      modifiers={['text']}
      onClick={() => {
        onUpdateLocation(location, true)
        onClose()
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
  onUpdateLocation: coreActions.updateLocation,
  onClose: modalActions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmLocationChangeModal)
