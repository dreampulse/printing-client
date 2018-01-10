import React from 'react'

import {selectFinishGroup} from '../../lib/selector'
import getCloudinaryUrl from '../../lib/cloudinary'

import {close} from '../../action/modal'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import StarRating from '../../component/star-rating'
import Checked from '../../component/checked'
import FeatureList from '../../component/feature-list'
import FeatureListItem from '../../component/feature-list-item'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'

import {connectLegacy} from '../util/connect-legacy'

const FinishGroupModal = ({finishGroup, onClose}) => {
  const headline = <Headline label={finishGroup.name} modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={() => onClose()} />]

  return (
    <Overlay modifiers={['l']} headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <Grid>
        <Column sm={12} md={8} lg={7}>
          <Paragraph classNames={['u-margin-bottom-xl']}>{finishGroup.description}</Paragraph>
          <Grid>
            <Column sm={6}>
              <Headline modifiers={['xs']} label="Printing Method" />
              <Paragraph classNames={['u-margin-bottom-xl']}>
                {finishGroup.properties.printingMethod}
              </Paragraph>
              <FeatureList>
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
            </Column>
            <Column sm={6}>
              {finishGroup.properties.materialSpec && (
                <Headline modifiers={['xs']} label="Material Spec" />
              )}
              {finishGroup.properties.materialSpec && (
                <Paragraph classNames={['u-margin-bottom-xl']}>
                  {finishGroup.properties.materialSpec}
                </Paragraph>
              )}
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
            </Column>
          </Grid>
        </Column>
        <Column sm={12} md={4} lg={5}>
          <Image
            src={getCloudinaryUrl(finishGroup.featuredImage, ['w_360', 'h_270', 'c_limit'])}
            alt="Image of finish group"
          />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = (state, props) => ({
  finishGroup: selectFinishGroup(state, props.materialId, props.finishGroupId)
})

const mapDispatchToProps = {
  onClose: close
}

export default connectLegacy(mapStateToProps, mapDispatchToProps)(FinishGroupModal)
