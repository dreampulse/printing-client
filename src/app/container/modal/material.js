import React from 'react'
import {connect} from 'react-redux'

import {
  selectMaterial
} from 'Lib/selector'

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

const MaterialModal = ({material}) => {
  const headline = <Headline label={material.name} modifiers={['l']} />
  const buttons = [
    <Button label="Close" />
  ]

  return (
    <Overlay modifiers={['l']} headline={headline} buttons={buttons}>
      <Grid>
        <Column sm={12} md={8} lg={7}>
          <Paragraph classNames={['u-margin-bottom-xl']}>
            {material.description}
          </Paragraph>
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
          {/* TODO image for material missing in data */}
          <Image src="http://placehold.it/360x270" alt="Image of material" />
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = (state, props) => ({
  material: selectMaterial(state, props.materialId)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MaterialModal)
