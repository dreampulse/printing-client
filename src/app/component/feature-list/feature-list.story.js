import React, {cloneElement} from 'react'
import {storiesOf} from '@storybook/react'

import FeatureList from '.'
import FeatureListItem from '../feature-list-item'

import StarRating from '../star-rating'
import Checked from '../checked'

const feature = <StarRating stars={3} />
const checked = <Checked />

storiesOf('Feature List & Feature List Item', module)
  .add('default', () => (
    <FeatureList>
      <FeatureListItem feature={feature} label="Label 1" />
      <FeatureListItem feature={feature} label="Label 2" />
      <FeatureListItem feature={feature} label="Label 3" />
      <FeatureListItem feature={feature} label="Label 4" />
    </FeatureList>
  ))
  .add('checked', () => (
    <FeatureList>
      <FeatureListItem feature={checked} label="Label 1" />
      <FeatureListItem feature={cloneElement(checked, {checked: true})} label="Label 2" />
      <FeatureListItem feature={cloneElement(checked, {checked: true})} label="Label 3" />
      <FeatureListItem feature={checked} label="Label 4" />
    </FeatureList>
  ))
