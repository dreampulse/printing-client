import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ColorTrait = ({classNames, color = '#ffffff', image}) => {
  const style = {
    backgroundColor: color
  }

  if (image) {
    style.backgroundImage = `url(${image})`
  }

  return (
    <span
      className={cn('ColorTrait', {border: color === '#ffffff' || image}, classNames)}
      style={style}
    />
  )
}

ColorTrait.propTypes = {
  ...propTypes.component,
  color: PropTypes.string,
  image: PropTypes.string
}

export default ColorTrait
