import React from 'react'
import {storiesOf} from '@storybook/react'

import PageHeader from '.'
import Link from '../link'

import backIcon from '../../../asset/icon/back.svg'

storiesOf('PageHeader', module).add('default', () => (
  <PageHeader
    label="Page Header"
    backLink={<Link icon={backIcon} label="Back" />}
    action={<Link largeIcon label="Action" />}
  />
))
