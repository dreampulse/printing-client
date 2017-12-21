import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const App = ({classNames, modifiers, children, header, footer}) => (
  <div className={buildClassName('app', modifiers, classNames)}>
    <header className="app__header">{header}</header>
    <main className="app__main">{children}</main>
    <footer className="app__footer">{footer}</footer>
  </div>
)

App.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired
}

export default App
