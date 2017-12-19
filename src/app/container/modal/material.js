import React from 'react'

import {selectMaterial, selectFinishGroup} from 'Lib/selector'
import getCloudinaryUrl from 'Lib/cloudinary'

import {close} from 'Action/modal'

import Button from 'Component/button'
import Overlay from 'Component/overlay'
import Headline from 'Component/headline'
import Paragraph from 'Component/paragraph'
import StarRating from 'Component/star-rating'
import Checked from 'Component/checked'
import FeatureList from 'Component/feature-list'
import FeatureListItem from 'Component/feature-list-item'
import Grid from 'Component/grid'
import Column from 'Component/column'
import Image from 'Component/image'

import {connectLegacy} from '../util/connect-legacy'

const MaterialModal = ({material, finishGroup, onClose}) => {
  const headline = <Headline label={material.name} modifiers={['l']} />
  const buttons = [<Button label="Close" onClick={() => onClose()} />]

  return (
    <Overlay modifiers={['l']} headline={headline} buttons={buttons} closePortal={() => onClose()}>
      <Grid>
        <Column sm={12} md={8} lg={7}>
          <Paragraph classNames={['u-margin-bottom-xl']}>{material.description}</Paragraph>
          <Grid>
            <Column sm={6}>
              <Headline modifiers={['xs']} label="Printing Method" />
              <Paragraph classNames={['u-margin-bottom-xl']}>
                {material.properties.printingMethod}
              </Paragraph>
              <FeatureList>
                {[
                  {key: 'flexibility', label: 'Flexibility'},
                  {key: 'levelOfDetail', label: 'Level of detail'},
                  {key: 'freedomOfDesign', label: 'Design freedom'},
                  {key: 'postProcessing', label: 'Post processing'}
                ].map(({key, label}) => (
                  <FeatureListItem
                    key={key}
                    feature={<StarRating stars={material.properties[key]} />}
                    label={label}
                  />
                ))}
              </FeatureList>
            </Column>
            <Column sm={6}>
              <Headline modifiers={['xs']} label="Material Spec" />
              <Paragraph classNames={['u-margin-bottom-xl']}>
                {material.properties.materialSpec}
              </Paragraph>
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
                    feature={<Checked checked={material.properties[key]} />}
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
            alt="Image of material"
          />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = (state, props) => ({
  material: selectMaterial(state, props.materialId),
  finishGroup: selectFinishGroup(state, props.materialId, props.finishGroupId)
})

const mapDispatchToProps = {
  onClose: close
}

export default connectLegacy(mapStateToProps, mapDispatchToProps)(MaterialModal)
