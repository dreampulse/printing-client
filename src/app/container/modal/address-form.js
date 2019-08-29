import React from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'

import * as modalActions from '../../action/modal'

import Modal from '../../component/modal'
import Headline from '../../component/headline'

import AddressFormPartial from '../address-form-partial'

const addressFormModalScrollContainerId = 'addressFormModalScrollContainer'

const AddressFormModal = ({closeModal, scrollTo}) => (
  <AddressFormPartial
    scrollTo={scrollTo}
    scrollContainerId={addressFormModalScrollContainerId}
    onCancel={() => closeModal()}
    onSubmitted={() => closeModal()}
  >
    {({submitButton, addressForm, cancelButton}) => (
      <Modal
        headline={<Headline label="Enter delivery address" size="l" />}
        buttons={[submitButton, cancelButton]}
        onClose={() => closeModal()}
        scrollContainerId={addressFormModalScrollContainerId}
      >
        {addressForm}
      </Modal>
    )}
  </AddressFormPartial>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(AddressFormModal)
