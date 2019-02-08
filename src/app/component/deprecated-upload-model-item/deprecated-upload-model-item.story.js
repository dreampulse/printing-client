import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import DeprecatedUploadModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button label="Button" modifiers={['tiny', 'minor']} onClick={action('click')} />
    <Button
      icon={placeholderIcon}
      modifiers={['tiny', 'icon-only', 'minor']}
      onClick={action('click')}
    />
    <Button
      icon={placeholderIcon}
      modifiers={['tiny', 'icon-only', 'minor']}
      onClick={action('click')}
    />
  </ButtonBar>
)

storiesOf('Deprecated Upload Model Item', module)
  .add('default', () => (
    <DeprecatedUploadModelItem
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
    <DeprecatedUploadModelItem
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      quantity={1}
      buttonBar={buttonBar()}
      onMagnify={action('magnify')}
    />
  ))