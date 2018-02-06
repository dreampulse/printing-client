import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'recompose'

import ModelList from '../component/model-list'

import {changeQuantity} from '../action/model'
import {updateLocation, updateCurrency} from '../action/user'

import {selectCommonQuantity} from '../lib/selector'

import config from '../../../config'

const ModelListPartial = ({
  modelConfigs
}) => {

}

const mapStateToProps = state => ({
  modelConfigs: state.user.user.shippingAddress,
  selectedModelConfigs: state.user.currency
})

const mapDispatchToProps = {
  onChangeSelectedModelConfigs: updateSelectedModelConfigs
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ModelListPartial)
