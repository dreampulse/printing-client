import React from 'react'
import {storiesOf} from '@storybook/react'

import FeatureParagraph from '.'
import Image from '../image'

const image = () => <Image src="http://placehold.it/200x200" />

storiesOf('FeatureParagraph', module).add('default', () => (
  <FeatureParagraph image={image()}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua.
  </FeatureParagraph>
))
