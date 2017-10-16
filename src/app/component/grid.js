import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const Grid = ({classNames, modifiers, children}) => (
  <div className={buildClassName('grid', modifiers, classNames)}>
    {children}
  </div>
)

Grid.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Grid
