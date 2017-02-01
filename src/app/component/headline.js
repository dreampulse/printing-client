import React from 'react'

import propTypes from '../lib/prop-types'
import buildClassName from '../lib/build-class-name'

const Headline = ({modifiers, classNames, label, tag = 'h1'}) =>
  React.createElement(tag, {
    className: buildClassName('headline', modifiers, classNames)
  }, label)

Headline.propTypes = {
  ...propTypes.component,
  tag: React.PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ]),
  label: React.PropTypes.string.isRequired
}

export default Headline
