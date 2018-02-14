import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import debounce from 'lodash/debounce'

import {selectCurrentMaterialGroup} from '../lib/selector'

import SearchField from '../component/search-field'

import {filterMaterials} from '../action/material'

import {connectLegacy} from './util/connect-legacy'

const MaterialFilterPartial = ({
  value,
  setValue,
  debouncedOnFilterMaterials,
  onFilterMaterials
}) => (
  <SearchField
    name="material-search"
    placeholder="Search…"
    value={value}
    onChange={v => {
      setValue(v)
      debouncedOnFilterMaterials(v)
    }}
    onClearClick={() => {
      setValue('')
      onFilterMaterials('')
    }}
  />
)

const mapStateToProps = state => ({
  materialGroups: state.material.materialGroups,
  materialFilter: state.material.materialFilter,
  selectedMaterialGroup: selectCurrentMaterialGroup(state)
})

const mapDispatchToProps = {
  onFilterMaterials: filterMaterials
}

export default compose(
  connectLegacy(mapStateToProps, mapDispatchToProps),
  withHandlers({
    debouncedOnFilterMaterials: props => debounce(props.onFilterMaterials, 300)
  }),
  withState('value', 'setValue', props => props.materialFilter),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (!this.props.selectedMaterialGroup && nextProps.selectedMaterialGroup) {
        this.props.setValue('')
      }
    }
  })
)(MaterialFilterPartial)
