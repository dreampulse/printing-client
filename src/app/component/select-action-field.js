import React from 'react'

import SelectField from './select-field'
import Button from './button'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const SelectActionField = ({
  classNames,
  modifiers = [],
  children,
  onActionClick,
  actionLabel,
  ...params
}) => (
  <div className={buildClassName('select-action-field', modifiers, classNames)}>
    <div className="select-action-field__select">
      <SelectField {...params}>{children}</SelectField>
    </div>
    <div className="select-action-field__button">
      <Button onClick={onActionClick} label={actionLabel} modifiers={['block', 'minor', 'input-height']} />
    </div>
  </div>
)

SelectActionField.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired,
  onActionClick: React.PropTypes.func,
  actionLabel: React.PropTypes.string.isRequired
}

export default SelectActionField
