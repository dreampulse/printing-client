import React from 'react'
import {storiesOf} from '@storybook/react'

import PageHeader from '.'
import Link from '../link'

import backIcon from '../../../asset/icon/back.svg'

storiesOf('Page Header', module).add('default', () => {
  const link = <Link icon={backIcon} label="Back" />
  return <PageHeader label="Page Header" backLink={link} />
})
