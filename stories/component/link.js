import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Link from 'Component/link'

import backIcon from 'Icon/back.svg'

storiesOf('Link', module)
  .add('default', () => <Link label="Default Link" href="#" onClick={action('click')} />)
  .add('with icon', () => (
    <Link label="Link with Icon" href="#" icon={backIcon} onClick={action('click')} />
  ))
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', height: '100%'}}>
      <Link label="Inverted Link" href="#" onClick={action('click')} />
    </div>
  ))
