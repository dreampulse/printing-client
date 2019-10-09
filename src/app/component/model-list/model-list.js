import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import defaultProps from 'recompose/defaultProps'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'

import Link from '../link'

const ModelList = ({
  classNames,
  children,
  actions,
  ids,
  checkedIds,
  headerAlwaysVisible = false,
  selectLabel,
  deselectLabel,
  onChangeCheckedIds
}) => {
  const toggleId = id => {
    if (checkedIds.includes(id)) {
      onChangeCheckedIds(checkedIds.filter(item => item !== id))
    } else {
      onChangeCheckedIds([...checkedIds, id])
    }
  }
  const toggleAll = () => {
    if (ids.length === checkedIds.length) {
      onChangeCheckedIds([])
    } else {
      onChangeCheckedIds(ids)
    }
  }

  const numChildren = React.Children.count(children)
  const childrenList = React.Children.map(children, (child, index) => {
    const id = child.props.id
    return (
      <li className="ModelList__item" key={id || index}>
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
    <li className="ModelList__action" key={`action-${index}`}>
      {child}
    </li>
  ))

  return (
    <div className={cn('ModelList', {}, classNames)}>
      {(numChildren > 1 || headerAlwaysVisible) && (
        <div className="ModelList__header">
          <div className="ModelList__select">
            <Link
              onClick={event => {
                event.preventDefault()
                toggleAll()
              }}
              label={ids.length === checkedIds.length ? deselectLabel : selectLabel}
            />
          </div>
          <ul className="ModelList__actions">{actionList}</ul>
        </div>
      )}
      <ul className="ModelList__items">{childrenList}</ul>
    </div>
  )
}

ModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node.isRequired,
  checkedIds: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/no-unused-prop-types
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
  }))
)

export default enhance(ModelList)
