import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Upload from '../../app/component/upload'

storiesOf('Upload', module)
  .add('default', () => (
    <Upload />
  ))

