// @flow

import React from 'react'
import {connect} from 'react-redux'

import {selectSceneId} from '../../selector'

import {close} from '../../action-next/modal'
import type {AppState} from '../../reducer-next'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import ModelViewer from '../../component/model-viewer'

const ModelViewerModal = ({onClose, sceneId, modelName}) => {
  const headline = <Headline label={`Preview ${modelName}`} modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={onClose} />]

  return (
    <Overlay modifiers={['l']} headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <ModelViewer sceneId={sceneId} />
    </Overlay>
  )
}

const mapStateToProps = (state: AppState) => ({
  sceneId: selectSceneId(state)
})

const mapDispatchToProps = {
  onClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelViewerModal)
