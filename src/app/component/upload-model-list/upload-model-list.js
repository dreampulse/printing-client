import React, {Children} from 'react'
import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'

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

const UploadModelList = ({classNames, children}) => {
  const childrenArray = Children.toArray(children)
  const previousChildren = usePrevious(children)
  const leavingChildren = getRemovedElements(Children.toArray(previousChildren), childrenArray)

  const transitions = useTransition(childrenArray, item => item.key, {
    from: item => ({
      transform: `translate(0px, ${getIndexOfElement(childrenArray, item.key) *
        UPLOAD_MODEL_ITEM_HEIGHT}px)`
    }),
    enter: item => ({
      transform: `translate(0px, ${getIndexOfElement(childrenArray, item.key) *
        UPLOAD_MODEL_ITEM_HEIGHT}px)`
    }),

    leave: item => {
      const elementIndex = getIndexOfElement(leavingChildren, item.key)

      // TODO: use interpolation for translate
      const y = elementIndex !== 0 ? `${elementIndex * STACK_HEIGHT}px` : '0'

      return {
        transform: `translate(0px, ${y})`,
        zIndex: leavingChildren.length - elementIndex + 100
      }
    },
    update: item => async next => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await next({
        transform: `translate(0px, ${getIndexOfElement(childrenArray, item.key) *
          UPLOAD_MODEL_ITEM_HEIGHT}px)`
      })
    },
    duration: 500
  })

  const leavingTransitions = useTransition(leavingChildren, item => item.key, {
    from: item => ({
      transform: `translate(0px,${getIndexOfElement(leavingChildren, item.key) * STACK_HEIGHT}px)`,
      zIndex: leavingChildren.length - getIndexOfElement(leavingChildren, item.key) + 200,
      opacity: 0
    }),
    enter: _item => async next => {
      await new Promise(resolve => setTimeout(resolve, 500))
      await next({opacity: 1})
      await next({
        transform: `translate(600px,-200px)`,
        opacity: 0
      })
    },
    duration: 500
  })

  return (
    <div
      className={cn('UploadModelList', {}, classNames)}
      style={{height: `${childrenArray.length * UPLOAD_MODEL_ITEM_HEIGHT}px`}}
    >
      {transitions.map(({item, props, key}) => (
        <animated.div key={key} style={props} className="UploadModelList__card">
          {item}
        </animated.div>
      ))}
      {leavingTransitions.map(({item, props, key}) => (
        <animated.div key={key} style={props} className="UploadModelList__card">
          {item}
        </animated.div>
      ))}
    </div>
  )
}

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default UploadModelList
