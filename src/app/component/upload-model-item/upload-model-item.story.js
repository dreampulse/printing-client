import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import UploadModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button label="Button" tiny minor onClick={action('click')} />
    <Button icon={placeholderIcon} iconOnly onClick={action('click')} />
    <Button icon={placeholderIcon} iconOnly onClick={action('click')} />
  </ButtonBar>
)

storiesOf('Upload Model Item', module)
  .add('default', () => (
    <UploadModelItem
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      quantity={1}
      buttonBar={buttonBar()}
      onMagnify={action('magnify')}
    />
  ))
  .add('no subline', () => (
    <UploadModelItem
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      quantity={1}
      buttonBar={buttonBar()}
      onMagnify={action('magnify')}
    />
  ))
