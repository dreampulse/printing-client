import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const MaterialStepSection = ({
  classNames,
  number,
  selected,
  action,
  children,
  label,
  open = false
}) => (
  <div className={cn('MaterialStepSection', {selected, open}, classNames)}>
    <div className="MaterialStepSection__headline">
      <span className="MaterialStepSection__number">{`${number}.`}</span>
      <span className="MaterialStepSection__label">{selected ? `${label}: ` : label}</span>
      {selected && (
        <>
          <span className="MaterialStepSection__selected">{selected}</span>
          <span className="MaterialStepSection__action">{action}</span>
        </>
      )}
    </div>
    {open && <div className="MaterialStepSection__content">{children}</div>}
  </div>
)

MaterialStepSection.propTypes = {
  ...propTypes.component,
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  number: PropTypes.string.isRequired,
  selected: PropTypes.string,
  action: PropTypes.node,
  open: PropTypes.bool
}

export default MaterialStepSection
