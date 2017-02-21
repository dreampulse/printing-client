import React, {PropTypes, Children, cloneElement} from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Container from './container'
import Grid from './grid'

const Footer = ({classNames, modifiers, children, copyline}) => (
  <footer className={buildClassName('footer', modifiers, classNames)}>
    <Container>
      <Grid>
        <div className="footer__copyline">{copyline}</div>
        <ul className="footer__link-list">
          {
            Children.map(children, link => (
              <li className="footer__link">
                {cloneElement(link, {modifiers: ['invert']})}
              </li>
            ))
          }
        </ul>
      </Grid>
    </Container>
  </footer>
)

Footer.propTypes = {
  ...propTypes.component,
  copyline: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Footer

