import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

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
