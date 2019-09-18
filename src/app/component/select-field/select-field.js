import PropTypes from 'prop-types'
import React, {cloneElement, useState} from 'react'
import noop from 'lodash/noop'

import cn from '../../lib/class-names'
import propTypes from '../../prop-types'

import Icon from '../icon'

import arrowIcon from '../../../asset/icon/arrow-down.svg'
import PositioningPortal from '../positioning-portal'

const SelectField = ({
  classNames,
  menu,
  name = null,
  placeholder = '',
  disabled = false,
  compact = false,
  error = false,
  warning = false,
  onChange = noop,
  value
}) => {
  const [isOpen, setOpen] = useState(false)

  const getLabel = ({value: v, label: l}) => l || v

  const button = (
    <button
      type="button"
      key="button"
      className={cn(
        'SelectField',
        {
          compact,
          error,
          disabled,
          warning,
          selected: !!value,
          constant: !menu,
          open: isOpen
        },
        classNames
      )}
      onClick={isOpen ? () => setOpen(false) : () => setOpen(true)}
      disabled={!menu || disabled}
    >
      <span className="SelectField__value">{value ? getLabel(value) : placeholder}</span>
      <Icon source={arrowIcon} />
    </button>
  )

  if (menu) {
    return (
      <PositioningPortal
        isOpen={isOpen}
        portalContent={({relatedWidth}) => (
          <div
            className="SelectField__menu"
            style={{
              minWidth: relatedWidth
            }}
          >
            {cloneElement(menu, {
              onClick: v => {
                setOpen(false)
                onChange(v, name)
              },
              selectedValue: value ? value.value : undefined
            })}
          </div>
        )}
      >
        {button}
      </PositioningPortal>
    )
  }

  return button
}

SelectField.propTypes = {
  ...propTypes.component,
  placeholder: PropTypes.string,
  value: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string // When not provided value will be shown
  }),
  onChange: PropTypes.func,
  menu: PropTypes.node, // When not provided select field will be in constant mode
  disabled: PropTypes.bool,
  name: PropTypes.string,
  compact: PropTypes.bool,
  error: PropTypes.bool,
  warning: PropTypes.bool
}

export default SelectField
