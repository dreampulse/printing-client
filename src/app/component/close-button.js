import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import closeIcon from '../../asset/icon/close.svg'

const CloseButton = ({classNames, modifiers, onClick = () => {}}) => (
  <button
    type="button"
    className={buildClassName('close-button', modifiers, classNames)}
    onClick={onClick}
  >
    <Icon modifiers={['block']} source={closeIcon} title="Close" />
  </button>
)

CloseButton.propTypes = {
  ...propTypes.component,
  onClick: PropTypes.func
}

export default CloseButton
