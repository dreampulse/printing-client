// @flow

import React from 'react'
import {connect} from 'react-redux'
import {compose, withState} from 'recompose'

import * as modalActions from '../../action/modal'
import * as modelActions from '../../action/model'
import * as coreActions from '../../action/core'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import LabeledField from '../../component/labeled-field'
import RadioButtonGroup from '../../component/radio-button-group'
import RadioButton from '../../component/radio-button'

const PickUnitModal = ({unit, setUnit, onUpdateUnit, closeModal, files, onUploadFiles}) => {
  const headline = <Headline label="Pick file unit" modifiers={['l']} />
  const buttons = [
    <Button label="Cancel" modifiers={['text']} onClick={() => closeModal()} />,
    <Button
      label="Upload"
      onClick={() => {
        onUpdateUnit(unit)
        onUploadFiles(files, unit)
        closeModal()
      }}
    />
  ]

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Paragraph>In which unit are the chosen files?</Paragraph>
      <LabeledField label="Unit:">
        <RadioButtonGroup name="unit" value={unit} onChange={setUnit}>
          <RadioButton value="mm" />
          <RadioButton value="cm" />
          <RadioButton value="in" />
        </RadioButtonGroup>
      </LabeledField>
    </Overlay>
  )
}

const mapStateToProps = state => ({
  globalUnit: state.core.unit
})

const mapDispatchToProps = {
  onUpdateUnit: coreActions.updateUnit,
  onUploadFiles: modelActions.uploadFiles,
  closeModal: modalActions.closeModal
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('unit', 'setUnit', props => props.globalUnit)
)(PickUnitModal)
