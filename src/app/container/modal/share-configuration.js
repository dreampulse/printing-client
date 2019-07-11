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

const INPUT_ID = 'share-configuration-input'

const ShareConfigurationModal = ({configurationUrl, closeModal}) => (
  <Modal
    headline={<Headline label="Configuration created" size="l" />}
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
    <Paragraph>Configuration has been created with the following URL.</Paragraph>
    <InputField
      id={INPUT_ID}
      label="URL to configuration"
      value={configurationUrl}
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
  withProps(({configurationId}) => ({
    configurationUrl: `${global.location.origin}/configuration/${configurationId}`
  }))
)(ShareConfigurationModal)
