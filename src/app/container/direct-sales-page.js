import React from 'react'

import SidebarLayout from 'Component/sidebar-layout'
import PageHeader from 'Component/page-header'
import ModelQuantityItem from 'Component/model-quantity-item'
import ModelQuantityItemList from 'Component/model-quantity-item-list'
import MaterialCard from 'Component/material-card'
import Info from 'Component/info'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import Price from 'Component/price'
import SelectField from 'Component/select-field'
import SelectMenu from 'Component/select-menu'

import AppLayout from './app-layout'

const DirectSalesPage = () => {
  const CartQantityList = () => (
    <ModelQuantityItemList>
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={2}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={3}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
      <ModelQuantityItem
        readOnly
        imageSource="http://placehold.it/130x98"
        quantity={1}
        title="model_item_title.stl with a very long text"
        subline="54 x 84 x 75 mm"
      />
    </ModelQuantityItemList>
  )

  const info = (
    <Info modifiers={['minor']}>
      <Headline modifiers={['s']} label="Headline" />
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Paragraph>
    </Info>
  )
  const price = (<Price value="$19.99" meta="incl. tax & shipping" />)
  const colorMenu = (
    <SelectMenu
      values={[
        {value: 'value1', colorValue: '#ffffff', label: 'Color 1'},
        {value: 'value2', colorValue: '#ff0000', label: 'Color 2'},
        {value: 'value3', colorValue: '#00ff00', label: 'Color 3'},
        {value: 'value4', colorValue: '#0000ff', label: 'Color 4'},
        {value: 'value5', colorImage: 'http://placehold.it/40x40', label: 'Color 5'}
      ]}
    />
  )
  const colorSelect = (
    <SelectField modifiers={['compact']} placeholder="Placeholder" menu={colorMenu} />
  )

  const materialSection = (
    <MaterialCard
      title="Polyamide"
      shipping="2-5 days, no express"
      subline="Solid, raw"
      description="Best all-round material"
      price={price}
      info={info}
      onMoreClick={() => {}}
      colorSelect={colorSelect}
      onSelectClick={() => {}}
      selectLabel="Checkout"
    />
  )

  return (
    <AppLayout currentStep={1} isDirectSales>
      <PageHeader label="Shared Compilation" />
      <SidebarLayout sidebar={materialSection}>
        <CartQantityList />
      </SidebarLayout>
    </AppLayout>
  )
}

export default DirectSalesPage
