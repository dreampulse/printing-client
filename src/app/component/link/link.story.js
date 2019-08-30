import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Link from '.'
import Icon from '../icon'

import backIcon from '../../../asset/icon/back.svg'

storiesOf('Link', module)
  .add('default', () => <Link label="Default Link" href="#" onClick={action('onClick')} />)
  .add('warning', () => <Link label="Warning Link" warning href="#" onClick={action('onClick')} />)
  .add('invert', () => <Link label="Inverted Link" invert href="#" onClick={action('onClick')} />)
  .add('with icon', () => (
    <Link
      label="Link with Icon"
      href="#"
      icon={<Icon source={backIcon} />}
      onClick={action('onClick')}
    />
  ))
  .add('with large icon', () => (
    <Link
      label="Link with Icon"
      href="#"
      largeIcon
      icon={<Icon source={backIcon} />}
      onClick={action('onClick')}
    />
  ))
