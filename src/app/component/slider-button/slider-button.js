import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Icon from '../icon'

import backIcon from '../../../asset/icon/back.svg'
import nextIcon from '../../../asset/icon/next.svg'

const Button = ({classNames, modifiers = [], onClick = () => {}}) => {
  const back = modifiers.indexOf('back') >= 0

  return (
    <button
      className={buildClassName('slider-button', modifiers, classNames)}
      type="button"
      onClick={onClick}
    >
      <Icon
        modifiers={['block']}
        source={back ? backIcon : nextIcon}
        title={back ? 'Goto previous page' : 'Goto next page'}
      />
    </button>
  )
}

Button.propTypes = {
  ...propTypes.component,
  source: PropTypes.shape({
    id: PropTypes.string
  }),
  onClick: PropTypes.func
}

export default Button
