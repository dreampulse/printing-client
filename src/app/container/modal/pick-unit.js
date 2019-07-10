import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import * as modalActions from '../../action/modal'
import * as modelActions from '../../action/model'
import * as coreActions from '../../action/core'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import RadioButtonGroup from '../../component/radio-button-group'
import RadioButton from '../../component/radio-button'

const PickUnitModal = ({
  unit,
  setUnit,
  onUpdateUnit,
  closeModal,
  files,
  onUploadFiles,
  featureFlags
}) => (
  <Modal
    headline={<Headline label="Pick file unit" size="l" />}
    buttons={[
      <Button key="cancel" label="Cancel" text onClick={() => closeModal()} />,
      <Button
        key="upload"
        label="Upload"
        onClick={() => {
          onUpdateUnit(unit)
          onUploadFiles(files, unit, !!featureFlags.refresh)
          closeModal()
        }}
      />
    ]}
  >
    <Paragraph>In which unit are the chosen files?</Paragraph>
    <RadioButtonGroup name="unit" value={unit} onChange={value => setUnit(value)}>
      <RadioButton value="mm" />
      <RadioButton value="cm" />
      <RadioButton value="in" />
    </RadioButtonGroup>
  </Modal>
)

const mapStateToProps = state => ({
  globalUnit: state.core.unit,
  featureFlags: state.core.featureFlags
})

const mapDispatchToProps = {
  onUpdateUnit: coreActions.updateUnit,
  onUploadFiles: modelActions.uploadFiles,
  closeModal: modalActions.closeModal
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('unit', 'setUnit', props => props.globalUnit)
)(PickUnitModal)
