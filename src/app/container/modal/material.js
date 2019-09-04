import React from 'react'
import {connect} from 'react-redux'

import getCloudinaryUrl from '../../lib/cloudinary'

import * as modalActions from '../../action/modal'

import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Image from '../../component/image'
import ExpandableText from '../../component/expandable-text'

const MaterialModal = ({material, closeModal}) => (
  <Modal
    size="s"
    headline={<Headline label={material.name} size="l" />}
    onClose={() => closeModal()}
  >
    <Paragraph classNames={['u-margin-bottom-l']}>
      <Image
        src={getCloudinaryUrl(material.featuredImage, ['w_360', 'h_270', 'c_limit'])}
        alt="Image of material"
      />
    </Paragraph>
    <Paragraph classNames={['u-margin-bottom-l']}>
      <ExpandableText moreLabel="… more" length={200}>
        {material.description}
      </ExpandableText>
    </Paragraph>
    <Headline size="s" label="Best used for:" classNames={['u-margin-bottom-s']} />
    <Paragraph>{material.descriptionShort}</Paragraph>
  </Modal>
)

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
