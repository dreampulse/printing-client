import React from 'react'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'

import {reloadPage} from '../../service/location'

import errorImage from '../../../asset/image/error.svg'

export default () => (
  <Modal
    headline={<Headline label="We will be back shortly!" size="l" />}
    buttons={<Button label="OK" onClick={() => reloadPage()} />}
  >
    <Grid>
      <Column md={3} classNames={['u-margin-bottom']}>
        <Image src={errorImage} alt="Service currently unavailable" />
      </Column>
      <Column md={9}>
        <Paragraph>
          We are currently undergoing scheduled maintenance to improve our service.
        </Paragraph>
        <Paragraph>We will be back in a few minutes.</Paragraph>
        <Paragraph>Please press OK to reload the app.</Paragraph>
      </Column>
    </Grid>
  </Modal>
)
