// @flow

import React from 'react'
import {connect} from 'react-redux'

import ModelList from '../component/model-list'
import Button from '../component/button'
import NumberField from '../component/number-field'
import type {AppState} from '../reducer-next'

import * as modelAction from '../action-next/model'
import * as navigationAction from '../action-next/navigation'

import {getCommonQuantity} from '../lib/quantity'
import {selectSelectedModelConfigs} from '../lib/selector'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelListPartial = ({
  children,
  editMode = false,
  selectedModelConfigIds,
  commonQuantity,
  onChangeSelectedModelConfigs,
  onDeleteModelConfigs,
  onChangeQuantities,
  onChooseMaterial
}) => {
  const disabled = selectedModelConfigIds.length === 0
  const numberOfItems = React.Children.count(children)
  const numberOfSelectedItems = selectedModelConfigIds.length
  const primaryActionCounter = `(${numberOfSelectedItems}/${numberOfItems})`
  const primaryActionLabel = editMode
    ? `Edit Material ${primaryActionCounter} …`
    : `Choose Material ${primaryActionCounter} …`

  const renderPrimaryActions = () => (
    <Button
      disabled={disabled}
      label={primaryActionLabel}
      onClick={() => onChooseMaterial(selectedModelConfigIds)}
    />
  )

  const renderSecondaryActions = () => [
    <NumberField
      disabled={disabled || commonQuantity === null}
      key="quantity"
      value={commonQuantity}
      onChange={quantity => onChangeQuantities(selectedModelConfigIds, quantity)}
    />,
    <Button
      disabled={disabled}
      modifiers={['minor']}
      icon={deleteIcon}
      key="delete"
      onClick={() => onDeleteModelConfigs(selectedModelConfigIds)}
    />
  ]

  return (
    <ModelList
      checkedIds={selectedModelConfigIds}
      onChangeCheckedIds={onChangeSelectedModelConfigs}
      primaryActions={renderPrimaryActions()}
      secondaryActions={renderSecondaryActions()}
    >
      {children}
    </ModelList>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  commonQuantity: getCommonQuantity(selectSelectedModelConfigs(state))
})

const mapDispatchToProps = {
  onChangeSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  onDeleteModelConfigs: modelAction.deleteModelConfigs,
  onChangeQuantities: modelAction.updateQuantities,
  onChooseMaterial: navigationAction.goToMaterial
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelListPartial)
