import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import CheckboxField from '../checkbox-field'
import Link from '../link'

const ModelList = ({
  classNames,
  modifiers,
  children,
  actions,
  ids,
  checkedIds,
  toggleId,
  toggleAll,
  headerAlwaysVisible = false,
  selectLabel,
  deselectLabel
}) => {
  const numChildren = React.Children.count(children)
  const childrenList = React.Children.map(children, (child, index) => {
    const id = child.props.id
    return (
      <li className="model-list__item" key={id || index}>
        {id && (numChildren > 1 || headerAlwaysVisible)
          ? React.cloneElement(child, {
              selected: checkedIds.includes(id),
              onSelect: () => toggleId(id)
            })
          : child}
      </li>
    )
  })

  const actionList = React.Children.map(actions, (child, index) => (
    <li className="model-list__action" key={`action-${index}`}>
      {child}
    </li>
  ))

  return (
    <div className={buildClassName('model-list', modifiers, classNames)}>
      {(numChildren > 1 || headerAlwaysVisible) && (
        <div className="model-list__header">
          <div className="model-list__select">
            <Link
              onClick={event => {
                event.preventDefault()
                toggleAll()
              }}
              label={ids.length === checkedIds.length ? deselectLabel : selectLabel}
            />
          </div>
          <ul className="model-list__actions">{actionList}</ul>
        </div>
      )}
      <ul className="model-list__items">{childrenList}</ul>
    </div>
  )
}

ModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired,
  checkedIds: PropTypes.arrayOf(PropTypes.string),
  onChangeCheckedIds: PropTypes.func,
  selectLabel: PropTypes.string.isRequired,
  deselectLabel: PropTypes.string.isRequired,
  headerAlwaysVisible: PropTypes.bool
}

const enhance = compose(
  defaultProps({
    checkedIds: [],
    onChangeCheckedIds: () => {}
  }),
  withProps(({children}) => ({
    ids: React.Children.toArray(children)
      .map(child => child.props.id)
      .filter(id => id !== undefined)
  })),
  withHandlers({
    toggleId: ({onChangeCheckedIds, checkedIds}) => id => {
      if (checkedIds.includes(id)) {
        onChangeCheckedIds(checkedIds.filter(item => item !== id))
      } else {
        onChangeCheckedIds([...checkedIds, id])
      }
    },
    toggleAll: ({onChangeCheckedIds, ids, checkedIds}) => () => {
      if (ids.length === checkedIds.length) {
        onChangeCheckedIds([])
      } else {
        onChangeCheckedIds(ids)
      }
    }
  })
)

export default enhance(ModelList)
