import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

const Column = ({classNames, children, sm = 12, md, lg, smPush, mdPush, lgPush}) => (
  <div
    className={buildClassName(
      'Column',
      {
        [`sm-${sm}`]: sm,
        [`md-${md}`]: md,
        [`lg-${lg}`]: lg,
        [`sm-push-${smPush}`]: smPush,
        [`md-push-${mdPush}`]: mdPush,
        [`lg-push-${lgPush}`]: lgPush
      },
      classNames
    )}
  >
    {children}
  </div>
)

Column.propTypes = {
  ...propTypes.component,
  children: PropTypes.node,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  smPush: PropTypes.number,
  mdPush: PropTypes.number,
  lgPush: PropTypes.number
}

export default Column
