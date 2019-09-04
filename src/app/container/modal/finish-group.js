import React from 'react'
import {connect} from 'react-redux'

import getCloudinaryUrl from '../../lib/cloudinary'

import * as modalActions from '../../action/modal'

import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import StarRating from '../../component/star-rating'
import Checked from '../../component/checked'
import FeatureList from '../../component/feature-list'
import FeatureListItem from '../../component/feature-list-item'
import Image from '../../component/image'
import ExpandableText from '../../component/expandable-text'

const FinishGroupModal = ({finishGroup, closeModal}) => (
  <Modal
    size="s"
    headline={<Headline label={finishGroup.name} size="l" />}
    onClose={() => closeModal()}
  >
    <Paragraph classNames={['u-margin-bottom-l']}>
      <Image
        src={getCloudinaryUrl(finishGroup.featuredImage, ['w_360', 'h_270', 'c_limit'])}
        alt="Image of finish group"
      />
    </Paragraph>
    <Paragraph classNames={['u-margin-bottom-l']}>
      <ExpandableText moreLabel="… more" length={200}>
        {finishGroup.description}
      </ExpandableText>
    </Paragraph>
    <FeatureList classNames={['u-margin-bottom-l']}>
      {[
        {key: 'flexibility', label: 'Flexibility'},
        {key: 'levelOfDetail', label: 'Level of detail'},
        {key: 'freedomOfDesign', label: 'Design freedom'},
        {key: 'postProcessing', label: 'Post processing'}
      ]
        .filter(({key}) => finishGroup.properties[key] !== undefined)
        .map(({key, label}) => (
          <FeatureListItem
            key={key}
            feature={<StarRating stars={finishGroup.properties[key]} />}
            label={label}
          />
        ))}
    </FeatureList>
    <Headline size="s" label="Printing Method" classNames={['u-margin-bottom-s']} />
    <Paragraph classNames={['u-margin-bottom-l']}>
      {finishGroup.properties.printingMethod}
    </Paragraph>
    <Headline size="s" label="Other" classNames={['u-margin-bottom-s']} />
    <FeatureList>
      {[
        {key: 'dishwasherSafe', label: 'Dishwasher safe'},
        {key: 'foodSafe', label: 'Food safe'},
        {key: 'waterproof', label: 'Waterproof'},
        {key: 'interlockingAndEnclosedParts', label: 'Interlocking and enclosed parts'},
        {key: 'recyclable', label: 'Recyclable'}
      ].map(({key, label}) => (
        <FeatureListItem
          key={key}
          feature={<Checked checked={finishGroup.properties[key]} />}
          label={label}
        />
      ))}
    </FeatureList>
  </Modal>
)

const mapStateToProps = (state, ownProps) => ({
  finishGroup: state.core.finishGroups[ownProps.finishGroupId]
})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishGroupModal)
