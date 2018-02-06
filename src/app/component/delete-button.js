import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'

import deleteIcon from '../../asset/icon/delete.svg'

const DeleteButton = ({classNames, modifiers, onClick = () => {}}) => (
  <button
    type="button"
    className={buildClassName('delete-button', modifiers, classNames)}
    onClick={onClick}
  >
    <Icon source={deleteIcon} title="Delete" />
  </button>
)

DeleteButton.propTypes = {
  ...propTypes.component,
  onClick: PropTypes.func
}

export default DeleteButton
