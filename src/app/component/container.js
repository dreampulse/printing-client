import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Container = ({classNames, modifiers, children}) => (
  <div className={buildClassName('container', modifiers, classNames)}>
    {children}
  </div>
)

Container.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default Container

