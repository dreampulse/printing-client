import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const MaterialStepHeadline = ({classNames, number, selected, action, children}) => (
  <div className={cn('MaterialStepHeadline', {selected}, classNames)}>
    <span className="MaterialStepHeadline__number">{`${number}.`}</span>
    <span className="MaterialStepHeadline__content">{selected ? `${children}: ` : children}</span>
    {selected && (
      <>
        <span className="MaterialStepHeadline__selected">{selected}</span>
        <span className="MaterialStepHeadline__action">{action}</span>
      </>
    )}
  </div>
)

MaterialStepHeadline.propTypes = {
  ...propTypes.component,
  children: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  selected: PropTypes.string,
  action: PropTypes.node
}

export default MaterialStepHeadline
