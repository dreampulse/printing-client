import React, {Children, useRef} from 'react'
import {Portal} from 'react-portal'
import PropTypes from 'prop-types'
import {useTransition, animated, interpolate, useSpring} from 'react-spring'
import delay from 'timeout-as-promise'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import {
  getIndexOfRemovedElement,
  getIndexOfElement,
  getRemovedElements
} from '../../lib/index-position'

import usePrevious from '../../hook/use-previous'

const UPLOAD_MODEL_ITEM_HEIGHT = 122 + 15
const STACK_HEIGHT = 10

const ANIMATION_STEP_DURATION = 2000

const UploadModelList = ({classNames, children}) => {
  const childrenArray = Children.toArray(children)
  const previousChildren = usePrevious(children)
  const previousChildrenArray = Children.toArray(previousChildren)
  const leavingChildren = getRemovedElements(previousChildrenArray, childrenArray)
  const refRoot = useRef(null)

  const transitions = useTransition(childrenArray, item => item.key, {
    from: item => ({
      y: getIndexOfElement(childrenArray, item.key) * UPLOAD_MODEL_ITEM_HEIGHT,
      scale: 1
    }),

    enter: item => ({
      y: getIndexOfElement(childrenArray, item.key) * UPLOAD_MODEL_ITEM_HEIGHT,
      scale: 1
    }),

    leave: item => [
      {
        to: {
          y: getIndexOfElement(leavingChildren, item.key) * STACK_HEIGHT,
          zIndex: leavingChildren.length - getIndexOfElement(leavingChildren, item.key) + 100,
          scale: 1 - getIndexOfElement(leavingChildren, item.key) * 0.01
        }
      },
      {
        to: {
          display: 'none'
        }
      }
    ],

    update: item => async next => {
      await delay(ANIMATION_STEP_DURATION)
      await next({
        to: {
          y: getIndexOfElement(childrenArray, item.key) * UPLOAD_MODEL_ITEM_HEIGHT
        }
      })
    },
    config: {
      duration: ANIMATION_STEP_DURATION
    }
  })

  const leavingTransitions = useTransition(leavingChildren, item => item.key, {
    from: item => ({
      x: refRoot.current.getBoundingClientRect().left,
      y:
        refRoot.current.getBoundingClientRect().top +
        getIndexOfElement(leavingChildren, item.key) * STACK_HEIGHT,
      scale: 1 - getIndexOfElement(leavingChildren, item.key) * 0.01,
      // zIndex: leavingChildren.length - getIndexOfElement(leavingChildren, item.key) + 200,
      opacity: 1,
      display: 'none'
    }),
    enter: _item => async next => {
      await delay(ANIMATION_STEP_DURATION)
      await next({
        display: 'initial',
        x: 600,
        y: -200,
        opacity: 0
      })
    },
    config: {
      duration: ANIMATION_STEP_DURATION
    }
  })

  return (
    <div
      className={cn('UploadModelList', {}, classNames)}
      style={{height: `${childrenArray.length * UPLOAD_MODEL_ITEM_HEIGHT}px`}}
      ref={refRoot}
    >
      {transitions.map(({item, props: {y, scale, display, zIndex, opacity}, key}) => (
        <animated.div
          key={key}
          style={{
            transform: interpolate(
              [y, scale],
              // eslint-disable-next-line
              (y, scale) => `translate(0px, ${y}px) scale(${scale})`
            ),
            zIndex,
            opacity,
            display
          }}
          className="UploadModelList__card"
        >
          {item}
        </animated.div>
      ))}
      <Portal>
        {leavingTransitions.map(({item, props: {display, zIndex, scale, opacity, x, y}, key}) => (
          <animated.div
            key={key}
            style={{
              zIndex,
              opacity,
              display,
              transform: interpolate(
                [x, y, scale],
                // eslint-disable-next-line
                (x, y, scale) => `translate(${x}px, ${y}px) scale(${scale})`
              )
            }}
            className="UploadModelList__card"
          >
            {item}
          </animated.div>
        ))}
      </Portal>
    </div>
  )
}

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default UploadModelList
