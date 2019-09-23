import React from 'react'
import {connect} from 'react-redux'

import Button from '../../component/button'
import Modal from '../../component/modal'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'

import * as modalActions from '../../action/modal'

import errorImage from '../../../asset/image/error.svg'

const ErrorModal = ({error, closeModal}) => (
  <Modal
    headline={<Headline label="Error occurred" size="l" />}
    buttons={<Button label="OK" onClick={closeModal} />}
  >
    <Grid>
      <Column md={3} classNames={['u-margin-bottom']}>
        <Image src={errorImage} alt="System Error" />
      </Column>
      <Column md={9}>
        <Paragraph minor>{error.message}</Paragraph>
      </Column>
    </Grid>
  </Modal>
)

const mapStateToProps = _state => ({})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal)
