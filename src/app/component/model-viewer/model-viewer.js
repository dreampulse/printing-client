import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

import LoadingIndicator from '../loading-indicator'

const ModelViewer = ({classNames, sceneId}) => (
  <div className={buildClassName('ModelViewer', {}, classNames)}>
    {sceneId ? (
      <iframe
        className="ModelViewer__iframe"
        title={`Model viewer ${sceneId}`}
        src={`https://www.3dvieweronline.com/members/Idee1d01930813d9f10858db96fd9d58b1/${sceneId}`}
      />
    ) : (
      <LoadingIndicator invert />
    )}
  </div>
)

ModelViewer.propTypes = {
  ...propTypes.component,
  sceneId: PropTypes.string
}

export default ModelViewer
