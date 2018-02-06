import PropTypes from 'prop-types'
import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

import Container from './container'
import CloseButton from './close-button'
import Headline from './headline'

const OverlayHeaderBar = ({classNames, modifiers, title, children, onClickClose = () => {}}) => (
  <header className={buildClassName('overlay-header-bar', modifiers, classNames)}>
    <Container>
      <div className="overlay-header-bar__main">
        <div className="overlay-header-bar__title">
          <CloseButton modifiers={['invert', 'l']} onClick={onClickClose} />
          <Headline modifiers={['l', 'invert']} label={title} />
        </div>
        <div className="overlay-header-bar__content">{children}</div>
      </div>
    </Container>
  </header>
)

OverlayHeaderBar.propTypes = {
  ...propTypes.component,
  title: PropTypes.string,
  children: PropTypes.node,
  onClickClose: PropTypes.func.isRequired
}

export default OverlayHeaderBar
