import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'
import config from '../../../config'
import uploadIcon from '../../asset/icon/upload.svg'

import {selectCartCount} from '../lib/selector'
import {goToUpload, goToCart} from '../action/navigation'
import {openIntercom, isActualIntercomImpl} from '../service/intercom'
import CartNavLink from '../component/cart-nav-link'
import NavLink from '../component/nav-link'
import NavBar from '../component/nav-bar'
import Button from '../component/button'
import Logo from '../component/logo'

const NavBarPartial = ({
  navBarContent,
  cartCount,
  onUploadClick,
  onCartClick,
  helpOnly = false
}) => (
  <NavBar
    leftContent={<Logo href={config.landingPageUrl} />}
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
              global.document.location.href = `mailto:${config.supportEmailAddress}`
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
  onUploadClick: goToUpload,
  onCartClick: goToCart
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBarPartial)
