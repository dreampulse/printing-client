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

const UploadModelList = ({classNames, children, onExit = noop}) => {
  const numChildren = Children.count(children)
  const previousChildren = usePrevious(children)
  const refRoot = useRef(null)

  if (Children.count(previousChildren) < numChildren && refRoot.current) {
    onExit()
  }

  return (
    <div
      className={cn('UploadModelList', {}, classNames)}
      style={{height: `${numChildren * UPLOAD_MODEL_ITEM_HEIGHT}px`}}
      ref={refRoot}
    >
      <TransitionGroup component={null}>
        {Children.map(children, (child, index) => (
          <Transition timeout={ANIMATION_DURATION}>
            {state => {
              const {top = 0, left = 0, width = 0} = refRoot.current
                ? refRoot.current.getBoundingClientRect()
                : {}

              if (state === 'exiting' || state === 'exited') {
                return ReactDOM.createPortal(
                  <CSSTransition in timeout={ANIMATION_DURATION} appear>
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
                    transform: `translateY(${UPLOAD_MODEL_ITEM_HEIGHT * index}px)`
                  }}
                >
                  {child}
                </div>
              )
            }}
          </Transition>
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
