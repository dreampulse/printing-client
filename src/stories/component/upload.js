import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import Upload from '../../app/component/upload'
import Button from '../../app/component/button'

storiesOf('Upload', module)
  .add('default', () => (
    <Upload label="upload" onUpload={action('onUpload')} multiple>
      <Button label="upload" />
    </Upload>
  ))

