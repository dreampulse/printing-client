import React from 'react'
import {connect} from 'react-redux'

import config from '../../../../config'

import * as modalActions from '../../action/modal'

import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import ProviderImage from '../../component/provider-image'

const ProviderModal = ({vendorId, closeModal}) => {
  const provider = config.providers.find(p => p.vendorId === vendorId)
  if (!provider) {
    closeModal()
    return null
  }

  return (
    <Modal
      size="s"
      headline={<Headline label={provider.name} size="l" />}
      onClose={() => closeModal()}
    >
      <ProviderImage src={provider.image} alt="Provider logo" />
      <Paragraph>{provider.description}</Paragraph>
    </Modal>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProviderModal)
