import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import helpIcon from '../../asset/icon/help.svg'
import cartIcon from '../../asset/icon/cart.svg'

import {selectCartCount} from '../lib/selector'

import {goToUpload, goToCart} from '../action/navigation'
import {openIntercom} from '../service/intercom'

import PageLayout from '../component/page-layout'
import Container from '../component/container'
import NavBar from '../component/nav-bar'
import IconLink from '../component/icon-link'
import Button from '../component/button'
import Logo from '../component/logo'

const AppLayout = ({
  children,
  footer,
  navBarContent,
  cartCount,
  onHomeClick,
  onUploadClick,
  onCartClick,
  minorBackground
}) => (
  <PageLayout
    minorBackground={minorBackground}
    header={
      <>
        <NavBar
          leftContent={<Logo onClick={() => onHomeClick()} />}
          rightContent={
            <>
              {navBarContent}
              <Route path="/" exact>
                {({match}) =>
                  !match && <Button label="Upload" onClick={() => onUploadClick()} minor compact />
                }
              </Route>
              <IconLink
                icon={cartIcon}
                disabled={cartCount < 1}
                cartCount={cartCount}
                onClick={event => {
                  event.preventDefault()
                  onCartClick()
                }}
              />
              <IconLink
                icon={helpIcon}
                onClick={event => {
                  event.preventDefault()
                  openIntercom()
                }}
              />
            </>
          }
        />
      </>
    }
    footer={footer}
  >
    <Container>{children}</Container>
  </PageLayout>
)

const mapStateToProps = state => ({
  cartCount: selectCartCount(state)
})

const mapDispatchToProps = {
  onHomeClick: goToUpload,
  onUploadClick: goToUpload,
  onCartClick: goToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppLayout)
