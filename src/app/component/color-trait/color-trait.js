import PropTypes from 'prop-types'
import React from 'react'
import Color from 'color'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const ColorTrait = ({classNames, color = '#ffffff', image}) => {
  const style = {
    backgroundColor: color
  }

  if (image) {
    style.backgroundImage = `url(${image})`
  }

  const border = !image && Color(color).luminosity() > 0.8

  return <span className={cn('ColorTrait', {border}, classNames)} style={style} />
}

ColorTrait.propTypes = {
  ...propTypes.component,
  color: PropTypes.string,
  image: PropTypes.string
}

export default ColorTrait
