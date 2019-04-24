import React, {Children} from 'react'
import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import {getIndexOfRemovedElement, getIndexOfElement} from '../../lib/index-position'

import usePrevious from '../../hook/use-previous'

const UPLOAD_MODEL_ITEM_HEIGHT = 122 + 15
const STACK_HEIGHT = 10

const UploadModelList = ({classNames, children}) => {
  const childrenArray = Children.toArray(children)
  const previousChildren = usePrevious(children)

  // todo z-index

  const transitions = useTransition(children, item => item.key, {
    from: item => ({
      transform: `translate(0px,${getIndexOfElement(children, item.key) *
        UPLOAD_MODEL_ITEM_HEIGHT}px)`,
      opacity: 1
    }),
    enter: item => ({
      transform: `translate(0px,${getIndexOfElement(children, item.key) *
        UPLOAD_MODEL_ITEM_HEIGHT}px)`
    }),

    leave: item => [
      {
        transform: `translate(0px,${getIndexOfRemovedElement(previousChildren, children, item.key) *
          STACK_HEIGHT}px)`,
        zIndex:
          childrenArray.length -
          getIndexOfRemovedElement(previousChildren, children, item.key) +
          100
      }
    ],

    update: item => async next => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      await next({
        transform: `translate(0px,${getIndexOfElement(children, item.key) *
          UPLOAD_MODEL_ITEM_HEIGHT}px)`
      })
    },
    duration: 2000
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
    </div>
  )
}

UploadModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired
}

export default UploadModelList
