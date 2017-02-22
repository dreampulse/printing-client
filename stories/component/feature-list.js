import React, {cloneElement} from 'react'
import {storiesOf} from '@kadira/storybook'

import FeatureList from '../../src/app/component/feature-list'
import FeatureListItem from '../../src/app/component/feature-list-item'

import StarRating from '../../src/app/component/star-rating'
import Info from '../../src/app/component/info'
import Checked from '../../src/app/component/checked'

const feature = (<StarRating stars={3} />)
const complexLabel = (
  <span>
    Label 4 <Info>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Info>
  </span>
)
const checked = (<Checked />)

storiesOf('Feature List & Feature List Item', module)
  .add('default', () => (
    <FeatureList>
      <FeatureListItem feature={feature} label="Label 1" />
      <FeatureListItem feature={feature} label="Label 2" />
      <FeatureListItem feature={feature} label="Label 3" />
      <FeatureListItem feature={feature} label={complexLabel} />
    </FeatureList>
  ))
  .add('checked', () => (
    <FeatureList>
      <FeatureListItem feature={checked} label="Label 1" />
      <FeatureListItem feature={cloneElement(checked, {checked: true})} label="Label 2" />
      <FeatureListItem feature={cloneElement(checked, {checked: true})} label="Label 3" />
      <FeatureListItem feature={checked} label={complexLabel} />
    </FeatureList>
  ))
