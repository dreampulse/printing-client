import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const FeatureParagraph = ({classNames, modifiers, children, image}) => (
  <p className={buildClassName('feature-paragraph', modifiers, classNames)}>
    {image}
    <span className="feature-paragraph__content">{children}</span>
  </p>
)

FeatureParagraph.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  image: PropTypes.node.isRequired
}

export default FeatureParagraph
