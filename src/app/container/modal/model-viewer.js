import React from 'react'
import {connect} from 'react-redux'

import * as modalActions from '../../action/modal'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import ModelViewer from '../../component/model-viewer'

const ModelViewerModal = ({closeModal, sceneId, modelName}) => {
  const headline = <Headline label={`Preview ${modelName}`} modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={closeModal} />]

  return (
    <Modal modifiers={['l']} headline={headline} buttons={buttons} closePortal={() => closeModal()}>
      <ModelViewer sceneId={sceneId} />
    </Modal>
  )
}

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
