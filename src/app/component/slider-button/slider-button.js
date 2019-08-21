import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Icon from '../icon'

import backIcon from '../../../asset/icon/back.svg'
import nextIcon from '../../../asset/icon/next.svg'

const Button = ({classNames, back = false, onClick = () => {}}) => (
  <button className={cn('SliderButton', {back}, classNames)} type="button" onClick={onClick}>
    <Icon
      block
      source={back ? backIcon : nextIcon}
      title={back ? 'Goto previous page' : 'Goto next page'}
    />
  </button>
)

Button.propTypes = {
  ...propTypes.component,
  source: PropTypes.shape({
    id: PropTypes.string
  }),
  onClick: PropTypes.func,
  back: PropTypes.bool
}

export default Button
