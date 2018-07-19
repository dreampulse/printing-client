import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import debounce from 'lodash/debounce'

import {selectMaterialGroups} from '../selector'

import SearchField from '../component/search-field'

const MaterialFilterPartial = ({
  value,
  setValue,
  debouncedOnFilterMaterials,
  onFilterMaterials
}) => (
  <SearchField
    classNames={['u-margin-bottom']}
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
  materialGroups: selectMaterialGroups(state)
})

const mapDispatchToProps = {}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    debouncedOnFilterMaterials: props => debounce(props.onFilterMaterials, 300)
  }),
  withState('value', 'setValue', props => props.materialFilter),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (prevProps.materialFilter !== this.props.materialFilter) {
        this.props.setValue(this.props.materialFilter)
      }
    }
  })
)(MaterialFilterPartial)
