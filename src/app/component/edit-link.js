import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Icon from './icon'
import editIcon from '../../../src/asset/icon/edit.svg'

const EditLink = ({classNames, modifiers, label, href = '#', onClick = () => {}, ...rest}) => (
  <a
    className={buildClassName('edit-link', modifiers, classNames)}
    href={href}
    onClick={onClick}
    {...rest}
  >
    <Icon source={editIcon} />
    {label}
  </a>
)

EditLink.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  string: PropTypes.string,
  onClick: PropTypes.func
}

export default EditLink
