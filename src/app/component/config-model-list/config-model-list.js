import React, {Children, useRef} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import usePrevious from '../../hook/use-previous'

// Keep this in sync with the height of `$upload-model-item-height-s`
const UPLOAD_MODEL_ITEM_HEIGHT = 102 + 15
const ANIMATION_DURATION = 1200

const configuredIndex = (children, index) => {
  const childArray = React.Children.toArray(children)

  let idx = 0
  for (let i = 0; i < index; i++) {
    if (!childArray[i].props.configured) {
      idx += 1
    }
  }

  return idx
}

const numOfUnconfiguredChildren = childArray =>
  childArray.reduce((acc, cur) => (cur.props.configured ? acc : acc + 1), 0)

const ConfigModelList = ({
  classNames,
  children,
  onConfigurationChanged = noop,
  onConfigurationDidChange = noop
}) => {
  const numChildren = React.Children.count(children)
  const numUnconfiguredChildren = numOfUnconfiguredChildren(React.Children.toArray(children))
  const previousChildren = usePrevious(children)
  const refRoot = useRef()
  // We use this portal as parent for all the individual portals
  const refRootPortal = useRef()

  if (
    numOfUnconfiguredChildren(React.Children.toArray(previousChildren)) > numUnconfiguredChildren &&
    refRoot.current
  ) {
    onConfigurationChanged()
  }

  return (
    <div
      className={cn('ConfigModelList', {}, classNames)}
      style={{
        height: `${numUnconfiguredChildren * UPLOAD_MODEL_ITEM_HEIGHT}px`
      }}
      ref={refRoot}
    >
      {ReactDOM.createPortal(
        <div ref={refRootPortal} className="ConfigModelList__rootPortal" />,
        global.document.body
      )}
      <TransitionGroup component={null}>
        {Children.map(children, (child, index) => (
          <CSSTransition timeout={ANIMATION_DURATION} classNames="ItemTransition" appear>
            {_transitionState => {
              const {top = 0, left = 0, width = 0} = refRoot.current
                ? refRoot.current.getBoundingClientRect()
                : {}

              if (refRootPortal.current && child.props.configured) {
                return ReactDOM.createPortal(
                  <CSSTransition
                    in
                    timeout={ANIMATION_DURATION}
                    classNames="PortalTransition"
                    appear
                    onEntered={() => {
                      onConfigurationDidChange()
                    }}
                  >
                    <div
                      className="ConfigModelList__item"
                      style={{
                        transform: `translateY(${UPLOAD_MODEL_ITEM_HEIGHT * index}px)`,
                        zIndex: numChildren - index + 1000,
                        top,
                        left,
                        width
                      }}
                    >
                      {React.cloneElement(child, {noCache: true, selected: true, onSelect: noop})}
                    </div>
                  </CSSTransition>,
                  refRootPortal.current
                )
              }

              return (
                <div
                  className="ConfigModelList__item"
                  style={{
                    transform: `translateY(${UPLOAD_MODEL_ITEM_HEIGHT *
                      configuredIndex(children, index)}px)`
                  }}
                >
                  {child}
                </div>
              )
            }}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

ConfigModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  onConfigurationChanged: PropTypes.func,
  onConfigurationDidChange: PropTypes.func
}

export default ConfigModelList
