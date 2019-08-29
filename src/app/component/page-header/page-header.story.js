import React from 'react'
import {storiesOf} from '@storybook/react'

import PageHeader from '.'
import Link from '../link'
import Icon from '../icon'

import backIcon from '../../../asset/icon/back.svg'
import placeholderIcon from '../../../asset/icon/placeholder.svg'

storiesOf('PageHeader', module).add('default', () => (
  <PageHeader
    label="Page Header"
    backLink={<Link icon={<Icon source={backIcon} />} label="Back" />}
    action={<Link largeIcon icon={<Icon source={placeholderIcon} />} label="Action" />}
  />
))
