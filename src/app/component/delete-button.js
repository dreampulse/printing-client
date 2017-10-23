import PropTypes from 'prop-types'
import React from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Icon from 'Component/icon'

import deleteIcon from 'Icon/delete.svg'

const DeleteButton = ({classNames, modifiers, onClick = () => {}}) => (
  <button
    type="button"
    className={buildClassName('delete-button', modifiers, classNames)}
    onClick={onClick}
  >
    {<Icon source={deleteIcon} />}
  </button>
)

DeleteButton.propTypes = {
  ...propTypes.component,
  onClick: PropTypes.func
}

export default DeleteButton
