import React from 'react'
import {connect} from 'react-redux'

import * as modalActions from '../../action/modal'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import ModelViewer from '../../component/model-viewer'

const ModelViewerModal = ({closeModal, sceneId, modelName}) => (
  <Modal
    size="l"
    headline={<Headline label={`Preview ${modelName}`} size="l" />}
    buttons={<Button label="Close" onClick={closeModal} />}
    onClose={() => closeModal()}
  >
    <ModelViewer sceneId={sceneId} />
  </Modal>
)

const mapStateToProps = state => ({
  sceneId: state.modelViewer.sceneId
})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelViewerModal)
