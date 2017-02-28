import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Upload from '../../app/component-legacy/upload'
import Button from '../../app/component-legacy/button'

storiesOf('Upload', module)
  .add('default', () => (
    <Upload label="upload" onUpload={action('onUpload')} multiple>
      <Button label="upload" />
    </Upload>
  ))

