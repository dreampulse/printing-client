import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import ModelList from '../component/model-list'
import Button from '../component/button'
import NumberField from '../component/number-field'

import {updateSelectedModelConfigs, deleteModelConfigs, updateQuantities} from '../action/model'

import {getCommonQuantity} from '../lib/quantity'
import {selectSelectedModelConfigIds, selectSelectedModelConfigs} from '../selector'

import deleteIcon from '../../asset/icon/delete.svg'

const ModelListPartial = ({
  children,
  selectedModelConfigIds,
  editMode = false,
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
    <Button disabled={disabled} label={primaryActionLabel} onClick={onChooseMaterial} />
  )

  const renderSecondaryActions = () => [
    <NumberField
      disabled={disabled || commonQuantity === undefined}
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
      value={selectedModelConfigIds}
      onChange={onChangeSelectedModelConfigs}
      primaryActions={renderPrimaryActions()}
      secondaryActions={renderSecondaryActions()}
    >
      {children}
    </ModelList>
  )
}

const mapStateToProps = state => ({
  selectedModelConfigIds: selectSelectedModelConfigIds(state),
  commonQuantity: getCommonQuantity(selectSelectedModelConfigs(state))
})

const mapDispatchToProps = {
  onChangeSelectedModelConfigs: updateSelectedModelConfigs,
  onDeleteModelConfigs: deleteModelConfigs,
  onChangeQuantities: updateQuantities,
  onChooseMaterial: /* TODO: openConfigurationModal() */ () => {}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ModelListPartial)
