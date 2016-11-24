import React from 'react';

import propTypes from '../util/prop-types';
import buildClassName from '../util/build-class-name';

const Section = ({classNames, modifiers, children}) => (
  <section className={buildClassName('section', modifiers, classNames)}>
    {children}
  </section>
);

Section.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired
};

export default Section;

