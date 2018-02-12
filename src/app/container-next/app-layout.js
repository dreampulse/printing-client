import React from 'react'

import FooterPartial from './footer-partial'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import App from '../component/app'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
import Button from '../component/button'

const AppLayout = ({
  children,
  cartCount,
  showUploadButton = false,
  onGoToHome = () => {},
  onUploadButtonClicked = () => {},
  onCartClicked = () => {}
}) => (
  <App
    header={[
      <NavBar key="navbar" onClickIdentity={onGoToHome}>
        {showUploadButton && (
          <Button
            label="Upload"
            onClick={onUploadButtonClicked}
            modifiers={['invert', 'compact']}
          />
        )}
        <IconLink
          modifiers={['invert']}
          icon={cartIcon}
          disabled={cartCount < 1}
          cartCount={cartCount}
          onClick={onCartClicked}
        />
        <IconLink modifiers={['invert']} icon={helpIcon} />
      </NavBar>
    ]}
    footer={<FooterPartial />}
  >
    <Container>{children}</Container>
  </App>
)

// TODO: connect to store
export default AppLayout
