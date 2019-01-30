import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'

import UploadModelItem from '.'
import Button from '../button'
import ButtonBar from '../button-bar'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button icon={placeholderIcon} modifiers={['tiny', 'icon-only', 'minor']} />
    <Button icon={placeholderIcon} modifiers={['tiny', 'icon-only', 'minor']} />
  </ButtonBar>
)

storiesOf('UploadModelItem', module)
  .add('default', () => (
    <UploadModelItem
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
    />
  ))
  .add('no subline', () => (
    <UploadModelItem
      id="some-id"
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      buttonsLeft={buttonBar()}
      buttonsRight={buttonBar()}
    />
  ))
  .add(
    'selected',
    withState({selected: true}, store => (
      <UploadModelItem
        id="some-id"
        imageSource="http://placehold.it/180x180"
        title="model_item_title.stl"
        buttonsLeft={buttonBar()}
        buttonsRight={buttonBar()}
        selected={store.state.selected}
        onSelect={() => store.set({selected: !store.state.selected})}
      />
    ))
  )
