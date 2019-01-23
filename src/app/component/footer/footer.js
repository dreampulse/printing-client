import PropTypes from 'prop-types'
import React, {Children} from 'react'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

const Footer = ({classNames, children, copyline}) => (
  <footer className={cn('Footer', {}, classNames)}>
    <div className="Footer__grid">
      <div className="Footer__copyline">{copyline}</div>
      <ul className="Footer__linkList">
        {Children.map(children, link => (
          <li className="Footer__link">{link}</li>
        ))}
      </ul>
    </div>
  </footer>
)

Footer.propTypes = {
  ...propTypes.component,
  copyline: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Footer
