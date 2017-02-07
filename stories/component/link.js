import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Link from '../../src/app/component/link'

import backIcon from '../../src/asset/icon/back.svg'

storiesOf('Link', module)
  .add('default', () => (
    <Link label="Default Link" href="#" onClick={action('click')} />
  ))
  .add('with icon', () => (
    <Link label="Link with Icon" href="#" icon={backIcon} onClick={action('click')} />
  ))
