import React from 'react'
import {storiesOf, action} from '@storybook/react'

import ModelItem from '../../src/app/component/model-item'
import Button from '../../src/app/component/button'
import ButtonBar from '../../src/app/component/button-bar'

import placeholderIcon from '../../src/asset/icon/placeholder.svg'

const buttonBar = () => (
  <ButtonBar>
    <Button label="Button" modifiers={['tiny', 'minor']} onClick={action('click')} />
    <Button
      icon={placeholderIcon}
      modifiers={['tiny', 'circular', 'minor']}
      onClick={action('click')}
    />
    <Button
      icon={placeholderIcon}
      modifiers={['tiny', 'circular', 'minor']}
      onClick={action('click')}
    />
  </ButtonBar>
)

storiesOf('Model Item', module)
  .add('default', () => (
    <ModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      subline="42 x 42 x 42 mm"
      quantity={1}
      buttonBar={buttonBar()}
    />
  ))
  .add('no subline', () => (
    <ModelItem
      imageSource="http://placehold.it/180x180"
      title="model_item_title.stl"
      quantity={1}
      buttonBar={buttonBar()}
    />
  ))
