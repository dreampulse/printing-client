import PropTypes from 'prop-types'
import React, {Children, cloneElement} from 'react'

import propTypes from 'Lib/prop-types'
import buildClassName from 'Lib/build-class-name'

import Container from 'Component/container'

const Footer = ({classNames, modifiers, children, copyline}) => (
  <footer className={buildClassName('footer', modifiers, classNames)}>
    <Container>
      <div className="footer__grid">
        <div className="footer__copyline">{copyline}</div>
        <ul className="footer__link-list">
          {Children.map(children, link => (
            <li className="footer__link">{cloneElement(link, {modifiers: ['invert']})}</li>
          ))}
        </ul>
      </div>
    </Container>
  </footer>
)

Footer.propTypes = {
  ...propTypes.component,
  copyline: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Footer
