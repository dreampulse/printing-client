import React from 'react'
import {storiesOf} from '@storybook/react'

import PageHeader from '.'
import Link from '../link'

import shareIcon from '../../../asset/icon/share.svg'
import backIcon from '../../../asset/icon/back.svg'

storiesOf('Page Header', module).add('default', () => (
  <PageHeader
    label="Page Header"
    backLink={<Link icon={backIcon} label="Back" />}
    action={<Link largeIcon icon={shareIcon} label="Action" />}
  />
))
