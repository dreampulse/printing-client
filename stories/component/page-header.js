import React from 'react'
import {storiesOf} from '@storybook/react'

import PageHeader from '../../src/app/component/page-header'
import Link from '../../src/app/component/link'

import backIcon from '../../src/asset/icon/back.svg'

storiesOf('Page Header', module).add('default', () => {
  const link = <Link icon={backIcon} label="Back" />
  return <PageHeader label="Page Header" backLink={link} />
})
