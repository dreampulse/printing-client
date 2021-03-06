import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withState} from '@dump247/storybook-state'

import UploadModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'
import Tooltip from '../tooltip'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button icon={placeholderIcon} iconOnly />
    <Button icon={placeholderIcon} iconOnly />
  </ButtonBar>
)

storiesOf('UploadModelItem', module)
  .add('default', () => (
    <UploadModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      subline="42 x 42 x 42 mm"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
    />
  ))
  .add('no subline', () => (
    <UploadModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
    />
  ))
  .add(
    'selected',
    withState({selected: true}, store => (
      <UploadModelItem
        imageSource="http://placehold.it/180x180"
        title="model_item_title_can_be_long_and_gets_truncated.stl"
        subline="42 x 42 x 42 mm"
        buttonsLeft={buttonBar()}
        buttonsRight={buttonBar()}
        selected={store.state.selected}
        onSelect={selected => store.set({selected})}
        onPreviewImageClick={action('onPreviewImageClick')}
      />
    ))
  )
  .add('s', () => (
    <UploadModelItem
      s
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      subline="42 x 42 x 42 mm"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
    />
  ))
  .add('no cache', () => (
    <UploadModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      subline="42 x 42 x 42 mm"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
      noCache
    />
  ))
  .add('alert', () => (
    <UploadModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title_can_be_long_and_gets_truncated.stl"
      subline="42 x 42 x 42 mm"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
      alert={
        <Tooltip content="Tooltip content with larger text can also span multiple lines">
          <Button icon={placeholderIcon} iconOnly warning />
        </Tooltip>
      }
    />
  ))
