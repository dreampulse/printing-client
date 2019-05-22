import React from 'react'
import PropTypes from 'prop-types'

import propTypes from '../../prop-types'
import cn from '../../lib/class-names'
import selectedIcon from '../../../asset/icon/selected.svg'

import LoadingIndicator from '../loading-indicator'
import Icon from '../icon'

export default class LoadingCheckmark extends React.Component {
  static propTypes = {
    ...propTypes.component,
    hideAfterTimeout: PropTypes.bool,
    done: PropTypes.bool
  }

  static defaultProps = {
    hideAfterTimeout: false,
    done: false
  }

  state = {
    doneActive: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.done !== this.props.done) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({doneActive: this.props.done})
    }
  }

  render() {
    const {hideAfterTimeout, done, classNames} = this.props
    const {doneActive} = this.state

    return (
      <span className={cn('LoadingCheckmark', {hideAfterTimeout, done, doneActive}, classNames)}>
        <span className="LoadingCheckmark__loading">
          <LoadingIndicator />
        </span>
        <span className="LoadingCheckmark__check">
          <Icon source={selectedIcon} />
        </span>
      </span>
    )
  }
}
