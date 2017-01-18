import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Link from '../../app/component/link'

storiesOf('Link', module)
  .add('default', () => (
    <Link label="Default Link" href="#" onClick={action('click')} />
  ))
  .add('minor', () => (
    <Link modifiers={['minor']} label="Default Link" href="#" onClick={action('click')} />
  ))
