import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const ColorSquare = ({
  classNames, modifiers, color = '#ffffff', image
}) => {
  const style = {
    backgroundColor: color
  }

  if (image) {
    style.backgroundImage = `url(${image})`
  }

  return (
    <span
      className={buildClassName('color-square', modifiers, classNames)}
      style={style}
    />
  )
}

ColorSquare.propTypes = {
  ...propTypes.component,
  color: PropTypes.string,
  image: PropTypes.string
}

export default ColorSquare
