import React from 'react'
import {storiesOf} from '@storybook/react'

import PageHeader from 'Component/page-header'
import Link from 'Component/link'

import backIcon from 'Icon/back.svg'

storiesOf('Page Header', module)
  .add('default', () => {
    const link = <Link icon={backIcon} label="Back" />
    return (
      <PageHeader label="Page Header" backLink={link} />
    )
  })
