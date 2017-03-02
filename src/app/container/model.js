import React from 'react'
import {chain} from 'ramda'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import toArray from 'lodash/toArray'

import Main from '../component-legacy/main'
import Button from '../component-legacy/button'
import Upload from '../component-legacy/upload'
import Headline from '../component-legacy/headline'
import SectionHeadline from '../component-legacy/section-headline'
import Table from '../component-legacy/table'
import TableHeadCell from '../component-legacy/table-head-cell'
import TableRow from '../component-legacy/table-row'
import TableCell from '../component-legacy/table-cell'

import {goToVendor} from '../action/navigation'
import {selectMaterial} from '../action/material'
import {uploadFiles} from '../action/model'
import {selectOffer} from '../action/cart'

import {getPriceAmount} from '../lib/get-total-amount'

const Model = ({
  onUploadFiles,
  materialStructure,
  models,
  onSelectedMaterial,
  selectedMaterial,
  location,
  price,
  uploadingModels,
  onSelectOffer
}) => {
  const onUpload = (files) => {
    onUploadFiles(toArray(files))
  }

  const UploadSection = () => (
    <section>
      <SectionHeadline label="1. Upload files" />
      <Upload onUpload={onUpload} multiple>
        <Button label="upload" />
      </Upload>

      <pre>{JSON.stringify(uploadingModels, '', 2)}</pre>
      <pre>{JSON.stringify(models, '', 2)}</pre>
    </section>
  )

  // The price for each material
  const pricesForMaterials = price && price.items.reduce((acc, item, index) => ({
    ...acc,
    [item.materialId]: Object.keys(price.printingService)
      .reduce((acc, key) => ({
        ...acc,
        [key]: price.printingService[key].items[index]
      }), {})
  }), {})

  const getPriceForMaterialId = id => (
    pricesForMaterials ? pricesForMaterials[id] : null
  )

  // This is just an example of how to traverse the material structure
  // for a simple drop down
  // put such logic in the /lib-folder
  const getMaterialConfigs = () => {
    const materialConfigs = []
    if (!materialStructure) return materialConfigs
    materialStructure.forEach(materialGroup =>
      materialGroup.materials.forEach(material =>
        material.finishGroups.forEach(finishGroup =>
          finishGroup.materialConfigs.forEach(materialConfig =>
            materialConfigs.push({
              ...materialConfig,
              prices: getPriceForMaterialId(materialConfig.id)
            })
          )
        )
      )
    )
    return materialConfigs
  }

  // get a string for all the prices of the different vendors
  const prices = (material) => {
    if (material.prices) {
      return Object.keys(material.prices)
        .map(key => material.prices[key].price)
        .join(', ')
    }
    return ''
  }

  const MaterialSection = () => (
    <section>
      <SectionHeadline label="2. Choose a material" />
      <select
        disabled={!materialStructure}
        onChange={e => onSelectedMaterial(e.target.value)}
        value={selectedMaterial}
      >
        <option>Select material</option>
        {getMaterialConfigs().map((material, index) =>
          <option value={material.id} key={index}>
            {material.name} ({material.color}) {prices(material)}
          </option>
        )}
      </select>
    </section>
  )

  const ShippingSection = () => (
    <section>
      <SectionHeadline label="Shipping to" />
      {location && <pre>{JSON.stringify(location, null, 2)}</pre>}
    </section>
  )

  const PriceTable = () => {
    const vendors = Object.keys(price.printingService)
      .map(name => ({name, ...price.printingService[name]}))

    const offers = chain(vendor =>
      vendor.shipping.map(shipping => ({
        name: vendor.name,
        items: vendor.items,
        shipping,
        vatPercentage: vendor.vatPercentage,
        currency: vendor.currency
      })), vendors
    )

    return (
      <Table
        head={[
          <TableHeadCell key={0}>Provider</TableHeadCell>,
          <TableHeadCell key={1}>Price incl. shipping</TableHeadCell>,
          <TableHeadCell key={2}>Shipping option</TableHeadCell>
        ]}
        rows={offers.map((offer, index) =>
          <TableRow key={index}>
            <TableCell>{offer.name}</TableCell>
            <TableCell>{getPriceAmount(offer)} {offer.currency}</TableCell>
            <TableCell>{offer.shipping.name}</TableCell>
            <TableCell classNames={['u-align-right']}>
              <Button
                label="Select"
                onClick={() =>
                  onSelectOffer({
                    vendor: offer.name,
                    shippingName: offer.shipping.name
                  })
                }
              />
            </TableCell>
          </TableRow>
        )}
      />
    )
  }

  const PriceSection = () => (
    <section>
      <SectionHeadline label="Prices" />
      {price && <PriceTable /> }
    </section>
  )

  return (
    <Main>
      <Headline label="Model config" modifiers={['xl']} />
      <UploadSection />
      <MaterialSection />
      <ShippingSection />
      <PriceSection />
    </Main>
  )
}

const mapStateToProps = state => ({
  materialStructure: state.material.materials && state.material.materials.materialStructure,
  uploadingModels: state.model.uploadingModels,
  models: state.model.models,
  selectedMaterial: state.material.selectedMaterial,
  location: state.user.user.shippingAddress,
  price: state.price.price
})

const mapDispatchToProps = {
  onUploadFiles: uploadFiles,
  onSelectedMaterial: selectMaterial,
  onGoToVendor: goToVendor,
  onSelectOffer: selectOffer
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Model)
