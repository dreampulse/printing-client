import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'

import uploadIcon from '../../asset/icon/upload.svg'

import {selectCartCount} from '../lib/selector'

import {goToUpload, goToCart} from '../action/navigation'
import {openIntercom, isActualIntercomImpl} from '../service/intercom'
import CartNavLink from '../component/cart-nav-link'
import NavLink from '../component/nav-link'
import NavBar from '../component/nav-bar'

import Button from '../component/button'
import Logo from '../component/logo'

import config from '../../../config'

const NavBarPartial = ({
  navBarContent,
  cartCount,
  onHomeClick,
  onUploadClick,
  onCartClick,
  helpOnly = false
}) => (
  <NavBar
    leftContent={<Logo onClick={() => onHomeClick()} />}
    rightContent={
      <>
        {navBarContent}
        {!helpOnly && (
          <>
            <Route path="/" exact>
              {({match}) =>
                !match && (
                  <NavLink label="Upload" onClick={() => onUploadClick()} icon={uploadIcon} />
                )
              }
            </Route>
            <CartNavLink
              label="Your Cart"
              count={cartCount}
              onClick={event => {
                event.preventDefault()
                onCartClick()
              }}
            />
          </>
        )}
        <Button
          minor
          compact
          label="Need help?"
          onClick={event => {
            event.preventDefault()
            if (isActualIntercomImpl()) {
              openIntercom()
            } else {
              global.document.location.href = `mailto:${config.contactEmail}`
            }
          }}
        />
      </>
    }
  />
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
)(NavBarPartial)
