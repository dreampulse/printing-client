// @flow

import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import * as modalActions from '../../action/modal'
import * as modelActions from '../../action/model'
import * as coreActions from '../../action/core'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import RadioButtonGroup from '../../component/radio-button-group'
import RadioButton from '../../component/radio-button'

const PickUnitModal = ({
  unit,
  setUnit,
  onUpdateUnit,
  onUpdateUseSameMaterials,
  closeModal,
  files,
  onUploadFiles,
  sameMaterials,
  setSameMaterials
}) => {
  const headline = <Headline label="Pick file unit" modifiers={['l']} />
  const buttons = [
    <Button label="Cancel" modifiers={['text']} onClick={() => closeModal()} />,
    <Button
      label="Upload"
      onClick={() => {
        onUpdateUnit(unit)
        onUpdateUseSameMaterials(sameMaterials === 'yes')
        onUploadFiles(files, unit)
        closeModal()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph>In which unit are the chosen files?</Paragraph>
      <RadioButtonGroup name="unit" value={unit} onChange={setUnit}>
        <RadioButton value="mm" />
        <RadioButton value="cm" />
        <RadioButton value="in" />
      </RadioButtonGroup>
      {files.length > 1 &&
        sameMaterials && (
          <Fragment>
            <Paragraph classNames={['u-margin-top-l']}>
              Do you want to use the same material for all files?
            </Paragraph>
            <RadioButtonGroup
              name="sameMaterials"
              value={sameMaterials}
              onChange={setSameMaterials}
            >
              <RadioButton value="yes" />
              <RadioButton value="no" />
            </RadioButtonGroup>
          </Fragment>
        )}
    </Overlay>
  )
}

const mapStateToProps = state => ({
  globalUnit: state.core.unit,
  useSameMaterial: state.core.useSameMaterial
})

const mapDispatchToProps = {
  onUpdateUnit: coreActions.updateUnit,
  onUpdateUseSameMaterials: coreActions.updateUseSameMaterial,
  onUploadFiles: modelActions.uploadFiles,
  closeModal: modalActions.closeModal
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('unit', 'setUnit', props => props.globalUnit),
  withState('sameMaterials', 'setSameMaterials', props => props.useSameMaterial && 'yes')
)(PickUnitModal)
