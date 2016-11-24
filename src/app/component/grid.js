import React from 'react';

import propTypes from '../util/prop-types';
import buildClassName from '../util/build-class-name';

const Grid = ({classNames, modifiers, children}) => (
  <div className={buildClassName('grid', modifiers, classNames)}>
    {children}
  </div>
);

Grid.propTypes = {
  ...propTypes.component,
  children: React.PropTypes.node.isRequired
};

export default Grid;
