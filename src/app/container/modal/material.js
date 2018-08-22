// @flow

import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'

import getCloudinaryUrl from '../../lib/cloudinary'
import {getMaterialFinishGroupProviderNames, getMaterialById} from '../../lib/material'
import {getFinishGroupProviderNames} from '../../lib/provider-selector'

import type {AppState} from '../../reducer'
import * as modalActions from '../../action/modal'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'
import ProviderDefinitionList from '../../component/provider-definition-list'

const MaterialModal = ({material, onClose}) => {
  const headline = <Headline label={material.name} modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={() => onClose()} />]

  return (
    <Overlay modifiers={['l']} headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <Grid>
        <Column sm={12} md={8} lg={7}>
          <Paragraph classNames={['u-margin-bottom-xl']}>{material.description}</Paragraph>
        </Column>
        <Column sm={12} md={4} lg={5}>
          <Image
            src={getCloudinaryUrl(material.featuredImage, ['w_360', 'h_270', 'c_limit'])}
            alt="Image of material"
          />
        </Column>
        <Column sm={12}>
          <Headline modifiers={['xs']} label="Provider names" />
          <ProviderDefinitionList
            providerValues={getFinishGroupProviderNames(
              getMaterialFinishGroupProviderNames(material)
            )}
          />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = (state: AppState) => ({
  materialGroups: state.core.materialGroups
})

const mapDispatchToProps = {
  onClose: modalActions.close
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({materialGroups, materialId}) => ({
    material: getMaterialById(materialGroups, materialId)
  }))
)(MaterialModal)
