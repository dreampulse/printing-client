import React from 'react'
import compact from 'lodash/compact'

import propTypes from '../util/prop-types'
import buildClassName from '../util/build-class-name'

const Column = ({classNames, modifiers = [], children,
  sm = 12, md, lg, smPush, mdPush, lgPush}) => {
  const allModifiers = compact([
    sm ? `sm-${sm}` : undefined,
    md ? `md-${md}` : undefined,
    lg ? `lg-${lg}` : undefined,
    smPush ? `sm-push-${smPush}` : undefined,
    mdPush ? `md-push-${mdPush}` : undefined,
    lgPush ? `lg-push-${lgPush}` : undefined,
    ...modifiers
  ])

  return (
    <div className={buildClassName('column', allModifiers, classNames)}>
      {children}
    </div>
  )
}

Column.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired,
  sm: React.PropTypes.number,
  md: React.PropTypes.number,
  lg: React.PropTypes.number,
  smPush: React.PropTypes.number,
  mdPush: React.PropTypes.number,
  lgPush: React.PropTypes.number
}

export default Column
