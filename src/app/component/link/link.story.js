import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Link from '.'

import backIcon from '../../../asset/icon/back.svg'

storiesOf('Link', module)
  .add('default', () => <Link label="Default Link" href="#" onClick={action('onClick')} />)
  .add('warning', () => <Link label="Warning Link" warning href="#" onClick={action('onClick')} />)
  .add('with icon', () => (
    <Link label="Link with Icon" href="#" icon={backIcon} onClick={action('onClick')} />
  ))
