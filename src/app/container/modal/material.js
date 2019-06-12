import React from 'react'
import {connect} from 'react-redux'

import getCloudinaryUrl from '../../lib/cloudinary'

import * as modalActions from '../../action/modal'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'

const MaterialModal = ({material, closeModal}) => {
  const headline = <Headline label={material.name} modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={() => closeModal()} />]

  return (
    <Modal l headline={headline} buttons={buttons} closePortal={() => closeModal()}>
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
      </Grid>
    </Modal>
  )
}

const mapStateToProps = (state, ownProps) => ({
  material: state.core.materials[ownProps.materialId]
})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MaterialModal)
