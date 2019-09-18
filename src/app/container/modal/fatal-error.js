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

export default ({error}) => (
  <Modal
    headline={<Headline label="System error occured" size="l" />}
    buttons={<Button label="OK" onClick={() => reloadPage()} />}
  >
    <Grid>
      <Column md={3} classNames={['u-margin-bottom']}>
        <Image src={errorImage} alt="System Error" />
      </Column>
      <Column md={9}>
        <Paragraph minor>{error.message}</Paragraph>
        <Paragraph>
          An unexpected error occured. Our technicians have been automatically warned and are
          working to fix the problem.
        </Paragraph>
        <Paragraph>Please press OK to reload the app.</Paragraph>
      </Column>
    </Grid>
  </Modal>
)
