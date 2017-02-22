import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

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
