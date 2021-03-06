import React from 'react'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import debounce from 'lodash/debounce'

import SearchField from '../component/search-field'

const MaterialFilterPartial = ({
  value,
  setValue,
  debouncedOnFilterMaterials,
  onFilterMaterials
}) => (
  <SearchField
    tiny
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

export default compose(
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
