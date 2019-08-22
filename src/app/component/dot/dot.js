import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Dot = ({classNames, index, active = false, onClick = () => {}}) => (
  <button className={cn('Dot', {active}, classNames)} type="button" onClick={onClick}>
    {index}
  </button>
)

Dot.propTypes = {
  ...propTypes.component,
  index: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool
}

export default Dot
