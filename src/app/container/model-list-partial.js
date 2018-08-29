// @flow

import React from 'react'
import {connect} from 'react-redux'
import compact from 'lodash/compact'
import intersection from 'lodash/intersection'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'

import ModelList from '../component/model-list'
import Button from '../component/button'
import NumberField from '../component/number-field'
import type {AppState} from '../reducer'

import * as modelAction from '../action/model'
import * as navigationAction from '../action/navigation'

import {getCommonQuantity} from '../lib/quantity'
import {selectSelectedModelConfigs, selectUploadedModelConfigs} from '../lib/selector'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelListPartial = ({
  children,
  editMode = false,
  selectedModelConfigIds,
  commonQuantity,
  updateSelectedModelConfigs,
  deleteModelConfigs,
  updateQuantities,
  goToMaterial
}) => {
  const disabled = selectedModelConfigIds.length === 0
  const numberOfItems = React.Children.count(children)
  const numberOfSelectedItems = selectedModelConfigIds.length
  const primaryActionCounter =
    numberOfSelectedItems > 0 ? ` (${numberOfSelectedItems}/${numberOfItems})` : ''
  const primaryActionLabel = editMode
    ? `Edit Material${primaryActionCounter} …`
    : `Choose Material${primaryActionCounter} …`

  const renderPrimaryActions = () => (
    <Button
      disabled={disabled}
      label={primaryActionLabel}
      onClick={() => goToMaterial(selectedModelConfigIds)}
    />
  )

  const renderSecondaryActions = () =>
    compact([
      !editMode && (
        <NumberField
          disabled={disabled || commonQuantity === null}
          key="quantity"
          value={commonQuantity}
          onChange={quantity => updateQuantities(selectedModelConfigIds, quantity)}
        />
      ),
      <Button
        disabled={disabled}
        modifiers={['minor']}
        icon={deleteIcon}
        key="delete"
        onClick={() => deleteModelConfigs(selectedModelConfigIds)}
      />
    ])

  return (
    <ModelList
      checkedIds={selectedModelConfigIds}
      onChangeCheckedIds={updateSelectedModelConfigs}
      primaryActions={renderPrimaryActions()}
      secondaryActions={renderSecondaryActions()}
    >
      {children}
    </ModelList>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  uploadedModelConfigs: selectUploadedModelConfigs(state),
  commonQuantity: getCommonQuantity(selectSelectedModelConfigs(state))
})

const mapDispatchToProps = {
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  clearSelectedModelConfigs: modelAction.clearSelectedModelConfigs,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  updateQuantities: modelAction.updateQuantities,
  goToMaterial: navigationAction.goToMaterial
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const {location} = this.props
      const allModelConfigIds = this.props.uploadedModelConfigs.map(modelConfig => modelConfig.id)
      const selectModelConfigIds = (location.state && location.state.selectModelConfigIds) || []
      const filteredModelConfigIds = intersection(allModelConfigIds, selectModelConfigIds)
      if (filteredModelConfigIds.length > 0) {
        this.props.updateSelectedModelConfigs(filteredModelConfigIds)
      }
    },
    componentWillUnmount() {
      this.props.clearSelectedModelConfigs()
    }
  })
)(ModelListPartial)
