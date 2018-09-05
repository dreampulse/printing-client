import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'

import propTypes from '../../lib/prop-types'
import buildClassName from '../../lib/build-class-name'

import CheckboxField from '../checkbox-field'

const ModelList = ({
  classNames,
  modifiers,
  children,
  primaryActions,
  secondaryActions,
  ids,
  checkedIds,
  toggleId,
  toggleAll
}) => {
  const childrenList = React.Children.map(children, (child, index) => {
    const id = child.props.id
    return (
      <li className="model-list__item" key={id || index}>
        {child}
        {id && (
          <div className="model-list__checkbox">
            <CheckboxField checked={checkedIds.includes(id)} onChange={() => toggleId(id)} />
          </div>
        )}
      </li>
    )
  })

  const primaryActionList = React.Children.map(primaryActions, (child, index) => (
    <li className="model-list__primary-action" key={`primary-${index}`}>
      {child}
    </li>
  ))

  const secondaryActionList = React.Children.map(secondaryActions, (child, index) => (
    <li className="model-list__secondary-action" key={`secondary-${index}`}>
      {child}
    </li>
  ))

  return (
    <div className={buildClassName('model-list', modifiers, classNames)}>
      <div className="model-list__header">
        <div className="model-list__header-checkbox">
          <CheckboxField checked={ids.length === checkedIds.length} onChange={toggleAll} />
        </div>
        <ul className="model-list__primary-actions">{primaryActionList}</ul>
        <ul className="model-list__secondary-actions">{secondaryActionList}</ul>
      </div>
      <ul className="model-list__items">{childrenList}</ul>
    </div>
  )
}

ModelList.propTypes = {
  ...propTypes.component,
  children: PropTypes.node.isRequired,
  primaryActions: PropTypes.node.isRequired,
  secondaryActions: PropTypes.node,
  checkedIds: PropTypes.arrayOf(PropTypes.string),
  onChangeCheckedIds: PropTypes.func
}

const enhance = compose(
  defaultProps({
    checkedIds: [],
    onChangeCheckedIds: () => {}
  }),
  withProps(({children}) => ({
    ids: React.Children
      .toArray(children)
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
