import React from 'react'
import {connect} from 'react-redux'

import config from '../../../../config'
import providerImages from '../../../asset/image/printing-service'

import * as modalActions from '../../action/modal'

import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import ProviderImage from '../../component/provider-image'
import ExpandableText from '../../component/expandable-text'

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
      <ProviderImage src={providerImages[provider.vendorId]} alt="Provider logo" />
      <Paragraph>
        <ExpandableText moreLabel="… more" length={200}>
          {provider.description}
        </ExpandableText>
      </Paragraph>
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
