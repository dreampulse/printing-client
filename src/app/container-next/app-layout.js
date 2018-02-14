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
  cartCount = 0,
  showUploadButton = false,
  onGoToHome = () => {},
  onUploadButtonClick = () => {},
  onCartClick = () => {},
  onHelpClick = () => {}
}) => (
  <App
    header={[
      <NavBar key="navbar" onClickIdentity={onGoToHome}>
        {showUploadButton && (
          <Button label="Upload" onClick={onUploadButtonClick} modifiers={['invert', 'compact']} />
        )}
        <IconLink
          modifiers={['invert']}
          icon={cartIcon}
          disabled={cartCount < 1}
          cartCount={cartCount}
          onClick={onCartClick}
        />
        <IconLink modifiers={['invert']} icon={helpIcon} onClick={onHelpClick} />
      </NavBar>
    ]}
    footer={<FooterPartial />}
  >
    <Container>{children}</Container>
  </App>
)

// TODO: connect to store
export default AppLayout
