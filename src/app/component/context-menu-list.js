import React from 'react';

import propTypes from '../util/prop-types';
import buildClassName from '../util/build-class-name';

const ContextMenuList = ({children, classNames, modifiers}) => (
  <ul className={buildClassName('context-menu-list')}>
    {children.map((child, index) =>
      <li key={index}>{child}</li>
    )}
  </ul>
);

ContextMenuList.propTypes = {
  ...propTypes.component
};


export default ContextMenuList;
