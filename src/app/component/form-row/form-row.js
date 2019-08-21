import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const FormRow = ({classNames, layout, children}) => {
  const mappedChildren = React.Children.map(children, child => (
    <div className="FormRow__column">{child}</div>
  ))

  return (
    <div className={cn('FormRow', {[`layout-${layout}`]: layout}, classNames)}>
      {mappedChildren}
    </div>
  )
}

FormRow.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(['half-half', 's-l', 'l-s'])
}

export default FormRow
