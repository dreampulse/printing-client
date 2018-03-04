import React from 'react'
import {connect} from 'react-redux'

import {selectSceneId} from '../../selector/model-viewer'

import {close} from '../../action-next/modal'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import ModelViewer from '../../component/model-viewer'

const ModelViewerModal = ({onClose, sceneId}) => {
  // TODO: Show actual model name instead of generic label "Preview"
  const headline = <Headline label="Preview" modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={onClose} />]

  return (
    <Overlay modifiers={['l']} headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <ModelViewer sceneId={sceneId} />
    </Overlay>
  )
}

const mapStateToProps = state => ({
  sceneId: selectSceneId(state)
})

const mapDispatchToProps = {
  onClose: close
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelViewerModal)
