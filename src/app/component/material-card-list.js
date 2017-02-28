import React, {PropTypes} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

const MaterialCardList = ({classNames, modifiers, children}) => {
  const cards = React.Children.map(children, card => (
    <li className="material-card-list__card">
      {card}
    </li>
  ))
  return (
    <ul className={buildClassName('material-card-list', modifiers, classNames)}>
      {cards}
    </ul>
  )
}

MaterialCardList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default MaterialCardList
