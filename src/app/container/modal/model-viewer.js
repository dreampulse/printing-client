// @flow

import React from 'react'
import {connect} from 'react-redux'

import * as modalActions from '../../action/modal'
import type {AppState} from '../../reducer'

import FullscreenOverlay from '../../component/fullscreen-overlay'
import ModelViewer from '../../component/model-viewer'

const ModelViewerModal = ({closeModal, sceneId}) => (
  <FullscreenOverlay modifiers={['invert']} closePortal={() => closeModal()}>
    <ModelViewer sceneId={sceneId} />
  </FullscreenOverlay>
)

const mapStateToProps = (state: AppState) => ({
  sceneId: state.modelViewer.sceneId
})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelViewerModal)
