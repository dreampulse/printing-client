import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'
import {action} from '@storybook/addon-actions'

import UploadModelList from '.'
import Button from '../button'
import UploadModelItem from '../upload-model-item'
import ButtonBar from '../button-bar'

import placeholderIcon from '../../../asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button icon={placeholderIcon} iconOnly />
    <Button icon={placeholderIcon} iconOnly />
  </ButtonBar>
)

const uploadModelItem = key => (
  <UploadModelItem
    key={key}
    imageSource="http://placehold.it/180x180"
    title="model_item_title_can_be_long_and_gets_truncated.stl"
    subline="42 x 42 x 42 mm"
    buttonsLeft={buttonBar()}
    buttonsRight={buttonBar()}
  />
)

const uploadModelItemList1 = [1, 2, 3, 4, 5].map(key => uploadModelItem(key))
const uploadModelItemList2 = [3, 5].map(key => uploadModelItem(key))

storiesOf('Upload Model List', module).add(
  'default',
  withState({toggle: true}, store => (
    <div style={{marginLeft: 100, width: 600}}>
      <UploadModelList onExit={action('onExit')}>
        {store.state.toggle ? uploadModelItemList1 : uploadModelItemList2}
      </UploadModelList>
      <Button
        classNames={['u-margin-top']}
        label="Play animation"
        onClick={() => store.set({toggle: !store.state.toggle})}
      />
    </div>
  ))
)
