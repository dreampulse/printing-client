import PropTypes from 'prop-types'
import React, {useRef} from 'react'
import {noop} from 'lodash'

import propTypes from '../../prop-types'
import buildClassName from '../../lib/class-names'

import Icon from '../icon'

import listIcon from '../../../asset/icon/list.svg'
import closeIcon from '../../../asset/icon/close.svg'

const ToolLayout = ({
  classNames,
  children,
  sidebar,
  isOpen = false,
  fullMain = false,
  scrollContainerId,
  onToggle = noop
}) => {
  const asideRef = useRef()

  return (
    <div className={buildClassName('ToolLayout', {fullMain, isOpen}, classNames)}>
      <aside ref={asideRef} className="ToolLayout__aside">
        <div className="ToolLayout__sidebar">
          {typeof sidebar === 'function' ? sidebar(asideRef.current) : sidebar}
        </div>
        <button
          type="button"
          className="ToolLayout__toggle"
          onClick={event => onToggle(!isOpen, event)}
        >
          <Icon block source={listIcon} />
          <Icon block source={closeIcon} />
        </button>
      </aside>
      <div onClick={event => onToggle(false, event)} className="ToolLayout__curtain" />
      <main className="ToolLayout__main" id={scrollContainerId}>
        {children}
      </main>
    </div>
  )
}

ToolLayout.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  sidebar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  fullMain: PropTypes.bool,
  scrollContainerId: PropTypes.string,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func
}

export default ToolLayout
