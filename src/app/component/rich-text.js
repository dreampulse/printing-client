import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const RichText = ({modifiers, classNames, children}) => (
  <div className={buildClassName('rich-text', modifiers, classNames)}>
    {children}
  </div>
)

RichText.propTypes = {
  ...propTypes.component,
  children: PropTypes.node
}

export default RichText
