import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import TabMenu from '../../app/component/tab-menu';
import TabItem from '../../app/component/tab-item';
import icon from '../../asset/icon/placeholder.svg';

storiesOf('Tab Menu', module)
  .add('default', () => (
    <TabMenu selectedItem="tab1" onChange={action('change')}>
      <TabItem classNames={['u-pull-left']} value="tab1" label="Tab 1" icon={icon} onClick={action('click')} />
      <TabItem classNames={['u-pull-left']} value="tab2" label="Tab 2" onClick={action('click')} />
      <TabItem classNames={['u-pull-left']} value="tab3" label="Tab 3" onClick={action('click')} />
      <TabItem classNames={['u-pull-right']} value="tab4" label="Tab 4" onClick={action('click')} />
    </TabMenu>
  ));
