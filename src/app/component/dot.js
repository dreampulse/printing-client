import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Dot = ({classNames, index, modifiers = [], onClick = () => {}}) => (
  <button className={buildClassName('dot', modifiers, classNames)} type="button" onClick={onClick}>
    {index}
  </button>
)

Dot.propTypes = {
  ...propTypes.component,
  index: PropTypes.number,
  onClick: PropTypes.func
}

export default Dot
