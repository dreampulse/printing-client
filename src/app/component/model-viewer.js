import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'
import LoadingIndicator from './loading-indicator'

const ModelViewer = ({classNames, modifiers = [], sceneId}) => (
  <div className={buildClassName('model-viewer', modifiers, classNames)}>
    {sceneId ? (
      <iframe
        className="model-viewer__iframe"
        title={`Model viewer ${sceneId}`}
        src={`https://clara.io/player/v2/${sceneId}`}
      />
    ) : (
      <LoadingIndicator classNames={['model-viewer__loading-indicator']} modifiers={['invert']} />
    )}
  </div>
)

ModelViewer.propTypes = {
  ...propTypes.component,
  sceneId: PropTypes.string
}

export default ModelViewer
