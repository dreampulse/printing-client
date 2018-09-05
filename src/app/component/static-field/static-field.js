import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import Link from '../link'

const StaticField = ({
  modifiers,
  classNames,
  value,
  changeLinkLabel,
  onChangeLinkClick = () => {}
}) => (
  <div className={buildClassName('static-field', modifiers, classNames)}>
    <div className="static-field__value">{value || ''}</div>
    {value && (
      <Link
        label={changeLinkLabel}
        onClick={event => {
          event.preventDefault()
          onChangeLinkClick(event)
        }}
      />
    )}
  </div>
)

StaticField.propTypes = {
  ...propTypes.component,
  onChangeLinkClick: PropTypes.func,
  changeLinkLabel: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default StaticField
