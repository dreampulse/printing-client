import React from 'react'
import {storiesOf} from '@storybook/react'
import {withState} from '@dump247/storybook-state'
import {action} from '@storybook/addon-actions'

import ConfigModelList from '.'
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

const uploadModelItem = (key, configured) => (
  <UploadModelItem
    s
    key={key}
    configured={configured}
    imageSource="http://placehold.it/180x180"
    title={`model_item_title_can_be_long_and_gets_truncated.stl ${key}`}
    subline="42 x 42 x 42 mm"
    buttonsLeft={buttonBar()}
    buttonsRight={buttonBar()}
  />
)

const uploadModelItemList1 = [[1, false], [2, false], [3, false], [4, false], [5, false]].map(
  ([key, configured]) => uploadModelItem(key, configured)
)
const uploadModelItemList2 = [[1, true], [2, true], [3, false], [4, true], [5, false]].map(
  ([key, configured]) => uploadModelItem(key, configured)
)
const uploadModelItemList3 = [[1, false], [3, false], [4, false], [5, false]].map(
  ([key, configured]) => uploadModelItem(key, configured)
)

storiesOf('ConfigModelList', module)
  .add(
    'with leaving items',
    withState({toggle: true}, store => (
      <div style={{marginLeft: 100, width: 600}}>
        <ConfigModelList onConfigurationChanged={action('onConfigurationChanged')}>
          {store.state.toggle ? uploadModelItemList1 : uploadModelItemList2}
        </ConfigModelList>
        <Button
          classNames={['u-margin-top']}
          label="Play animation"
          onClick={() => store.set({toggle: !store.state.toggle})}
        />
      </div>
    ))
  )
  .add(
    'with removing items',
    withState({toggle: true}, store => (
      <div style={{marginLeft: 100, width: 600}}>
        <ConfigModelList onConfigurationChanged={action('onConfigurationChanged')}>
          {store.state.toggle ? uploadModelItemList1 : uploadModelItemList3}
        </ConfigModelList>
        <Button
          classNames={['u-margin-top']}
          label="Play animation"
          onClick={() => store.set({toggle: !store.state.toggle})}
        />
      </div>
    ))
  )
