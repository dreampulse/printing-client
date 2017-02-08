import React from 'react'
import {chain} from 'ramda'
import {connect} from 'react-redux'
import toArray from 'lodash/toArray'

import Main from '../component/main'
import Button from '../component/button'
import Upload from '../component/upload'
import Headline from '../component/headline'
import SectionHeadline from '../component/section-headline'
import Table from '../component/table'
import TableHeadCell from '../component/table-head-cell'
import TableRow from '../component/table-row'
import TableCell from '../component/table-cell'

import {goToVendor} from '../action/navigation'
import {selectMaterial} from '../action/material'
import {uploadFiles} from '../action/model'

import {getPriceAmount} from '../lib/get-total-amount'

const Model = ({
  onUploadFiles,
  materials,
  models,
  onSelectedMaterial,
  selectedMaterialIndex,
  location,
  price
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

      <pre>{JSON.stringify(models, '', 2)}</pre>
    </section>
  )

  const MaterialSection = () => (
    <section>
      <SectionHeadline label="2. Choose a material" />
      <select
        disabled={!materials}
        onChange={e => onSelectedMaterial(e.target.value)}
        value={selectedMaterialIndex}
      >
        <option>Select material</option>
        {materials && Object.keys(materials).map((material, index) =>
          <option value={index} key={index}>{materials[material].name}</option>
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
    // TODO: improve server response to avoid this
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
          <TableHeadCell key={2}>Shipping ption</TableHeadCell>
        ]}
        rows={offers.map((offer, index) =>
          <TableRow key={index}>
            <TableCell>{offer.name}</TableCell>
            <TableCell>{getPriceAmount(offer)} {offer.currency}</TableCell>
            <TableCell>{offer.shipping.name}</TableCell>
            <TableCell classNames={['u-align-right']}>
              <Button label="Select" onClick={() => { console.log('-- todo') }} />
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
  materials: state.material.materials,
  models: state.model.models,
  selectedMaterialIndex: state.material.selectedIndex,
  location: state.user.user.shippingAddress,
  price: state.price.price
})

const mapDispatchToProps = {
  onUploadFiles: uploadFiles,
  onSelectedMaterial: selectMaterial,
  onGoToVendor: goToVendor
}

export default connect(mapStateToProps, mapDispatchToProps)(Model)
