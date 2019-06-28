import React from 'react'
import {connect} from 'react-redux'

import Button from '../../component/button'
import Overlay from '../../component/overlay'
import Headline from '../../component/headline'
import Paragraph from '../../component/paragraph'
import Grid from '../../component/grid'
import Column from '../../component/column'
import Image from '../../component/image'

import * as modalActions from '../../action/modal'

import errorImage from '../../../asset/image/error.svg'

const ErrorModal = ({error, closeModal}) => {
  const buttons = [<Button label="OK" onClick={closeModal} />]
  const headline = <Headline label="Error occurred" size="l" />

  return (
    <Overlay headline={headline} buttons={buttons} closeable={false}>
      <Grid>
        <Column sm={3}>
          <Image src={errorImage} alt="System Error" />
        </Column>
        <Column sm={9}>
          <Paragraph minor>{error.message}</Paragraph>
        </Column>
      </Grid>
    </Overlay>
  )
}

const mapStateToProps = _state => ({})

const mapDispatchToProps = {
  closeModal: modalActions.closeModal
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorModal)
