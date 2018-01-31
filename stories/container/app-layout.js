import React from 'react'
import {storiesOf} from '@storybook/react'

import {AppLayoutComponent} from '../../src/app/container-next/app-layout'

storiesOf('Container.AppLayout', module).add('default', () => (
  <AppLayoutComponent header="some-header">some-content</AppLayoutComponent>
))
