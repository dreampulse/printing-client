import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

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
