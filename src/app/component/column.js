import PropTypes from 'prop-types'
import React from 'react'
import compact from 'lodash/compact'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Column = ({
  classNames,
  modifiers = [],
  children,
  sm = 12,
  md,
  lg,
  smPush,
  mdPush,
  lgPush
}) => {
  const finalModifiers = compact([
    ...modifiers,
    sm ? `sm-${sm}` : undefined,
    md ? `md-${md}` : undefined,
    lg ? `lg-${lg}` : undefined,
    smPush ? `sm-push-${smPush}` : undefined,
    mdPush ? `md-push-${mdPush}` : undefined,
    lgPush ? `lg-push-${lgPush}` : undefined
  ])

  return <div className={buildClassName('column', finalModifiers, classNames)}>{children}</div>
}

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
