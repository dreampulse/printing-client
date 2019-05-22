import React, {Children, useRef} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import {CSSTransition, Transition, TransitionGroup} from 'react-transition-group'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import usePrevious from '../../hook/use-previous'

// Keep this in sync with the height of `UploadModelItem`
const UPLOAD_MODEL_ITEM_HEIGHT = 122 + 15
const ANIMATION_DURATION = 600

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

const UploadModelList = ({classNames, children, onConfigurationChanged = noop}) => {
  const numChildren = React.Children.count(children)
  const numUnconfiguredChildren = numOfUnconfiguredChildren(React.Children.toArray(children))
  const previousChildren = usePrevious(children)
  const refRoot = useRef()

  if (
    numOfUnconfiguredChildren(React.Children.toArray(previousChildren)) < numUnconfiguredChildren &&
    refRoot.current
  ) {
    onConfigurationChanged()
  }

  return (
    <div
      className={cn('UploadModelList', {}, classNames)}
      style={{
        height: `${numUnconfiguredChildren * UPLOAD_MODEL_ITEM_HEIGHT}px`
      }}
      ref={refRoot}
    >
      <TransitionGroup component={null}>
        {Children.map(children, (child, index) => (
          <CSSTransition timeout={ANIMATION_DURATION} classNames="ItemTransition" appear>
            {_childTransitionState => {
              const {top = 0, left = 0, width = 0} = refRoot.current
                ? refRoot.current.getBoundingClientRect()
                : {}

              if (child.props.configured) {
                return ReactDOM.createPortal(
                  <CSSTransition
                    in
                    timeout={ANIMATION_DURATION}
                    classNames="PortalTransition"
                    appear
                  >
                    <div
                      className="UploadModelList__item"
                      style={{
                        transform: `translateY(${UPLOAD_MODEL_ITEM_HEIGHT * index}px)`,
                        zIndex: numChildren - index + 1000,
                        top,
                        left,
                        width
                      }}
                    >
                      {child}
                    </div>
                  </CSSTransition>,
                  global.document.body
                )
              }

              return (
                <div
                  className="UploadModelList__item"
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

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default UploadModelList
