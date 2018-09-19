import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Link from '.'

import backIcon from '../../../asset/icon/back.svg'

storiesOf('Link', module)
  .add('default', () => <Link label="Default Link" href="#" onClick={action('click')} />)
  .add('with icon', () => (
    <Link label="Link with Icon" href="#" icon={backIcon} onClick={action('click')} />
  ))
  .add('invert', () => (
    <div className="u-invert" style={{width: '100%', minHeight: '100vh'}}>
      <Link label="Inverted Link" modifiers={['invert']} href="#" onClick={action('click')} />
    </div>
  ))
