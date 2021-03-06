import React from 'react'
import {connect} from 'react-redux'
import compact from 'lodash/compact'
import intersection from 'lodash/intersection'
import {withRouter} from 'react-router'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'

import ModelList from '../component/model-list'
import Button from '../component/button'

import * as coreAction from '../action/core'
import * as modelAction from '../action/model'
import * as modalAction from '../action/modal'

import * as selector from '../lib/selector'
import * as printingEngine from '../lib/printing-engine'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelListPartial = ({
  children,
  enableShare = false,
  selectedModelConfigIds,
  updateSelectedModelConfigs,
  deleteModelConfigs,
  onPrimaryActionClick,
  createConfiguration
}) => {
  const disabled = selectedModelConfigIds.length === 0
  const numberOfItems = React.Children.count(children)
  const numberOfSelectedItems = selectedModelConfigIds.length

  const renderActions = () =>
    compact([
      <Button
        disabled={disabled}
        iconOnly
        icon={deleteIcon}
        key="delete"
        onClick={() => deleteModelConfigs(selectedModelConfigIds)}
      />,
      <Button
        key="edit"
        tiny
        minor
        disabled={disabled}
        label={`Edit Material${
          numberOfSelectedItems > 0 ? ` (${numberOfSelectedItems} of ${numberOfItems})` : ''
        }`}
        onClick={() => onPrimaryActionClick(selectedModelConfigIds)}
      />,
      enableShare && (
        <Button
          key="share"
          tiny
          minor
          disabled={disabled}
          label="Share configuration"
          onClick={() => createConfiguration(selectedModelConfigIds)}
        />
      )
    ])

  return (
    <ModelList
      checkedIds={selectedModelConfigIds}
      onChangeCheckedIds={updateSelectedModelConfigs}
      actions={renderActions()}
      headerAlwaysVisible={enableShare}
      selectLabel="Select all files"
      deselectLabel="Deselect all files"
    >
      {children}
    </ModelList>
  )
}

const mapStateToProps = state => ({
  selectedModelConfigIds: state.core.selectedModelConfigs,
  uploadedModelConfigs: selector.selectUploadedModelConfigs(state)
})

const mapDispatchToProps = {
  updateSelectedModelConfigs: modelAction.updateSelectedModelConfigs,
  clearSelectedModelConfigs: modelAction.clearSelectedModelConfigs,
  deleteModelConfigs: modelAction.deleteModelConfigs,
  openShareConfigurationModal: modalAction.openShareConfigurationModal,
  fatalError: coreAction.fatalError
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    createConfiguration: ({
      uploadedModelConfigs,
      fatalError,
      openShareConfigurationModal
    }) => configIds => {
      const items = compact(
        configIds.map(configId => {
          const modelConfig = uploadedModelConfigs.find(mc => mc.id === configId)
          if (!modelConfig) {
            return null
          }
          return {
            modelId: modelConfig.modelId,
            quantity: modelConfig.quantity
          }
        })
      )

      printingEngine
        .createConfiguration({items})
        .then(({configurationId}) => {
          openShareConfigurationModal(configurationId)
        })
        .catch(fatalError)
    }
  }),
  lifecycle({
    componentDidMount() {
      const {location} = this.props
      const allModelConfigIds = this.props.uploadedModelConfigs.map(modelConfig => modelConfig.id)
      const selectModelConfigIds = (location.state && location.state.selectModelConfigIds) || []
      const filteredModelConfigIds = intersection(allModelConfigIds, selectModelConfigIds)
      this.props.updateSelectedModelConfigs(filteredModelConfigIds)
    }
  })
)(ModelListPartial)
