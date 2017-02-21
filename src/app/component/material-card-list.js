import React, {PropTypes} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const MaterialCardList = ({classNames, modifiers, children}) => {
  const cards = React.Children.map(children, card => (
    <div className="material-card-list__card">
      {card}
    </div>
  ))
  return (
    <div className={buildClassName('material-card-list', modifiers, classNames)}>
      {cards}
    </div>
  )
}

MaterialCardList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default MaterialCardList
