import React from 'react'
import {storiesOf} from '@kadira/storybook'
import SectionHeadline from '../../app/component/section-headline'

import icon from '../../asset/icon/placeholder.svg'

storiesOf('Section Headline', module)
  .add('default', () => (
    <SectionHeadline label="Section Headline" />
  ))
  .add('s', () => (
    <SectionHeadline modifiers={['s']} label="Small Section Headline" />
  ))
  .add('with icon', () => (
    <SectionHeadline label="Section Headline" icon={icon} />
  ))

