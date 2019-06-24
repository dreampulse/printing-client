/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'

// Interface is borrowed from unmaintained repository
// https://github.com/dump247/storybook-state/blob/master/src/index.js
class Store {
  constructor(initialState = {}) {
    this.initialState = Object.freeze({...initialState})
    this.state = this.initialState
    this.handlers = []
  }

  set(state) {
    this.state = Object.freeze({...this.state, ...state})
    this.fireStateChange()
  }

  reset() {
    if (this.initialState !== this.state) {
      this.state = this.initialState
      this.fireStateChange()
    }
  }

  subscribe(handler) {
    if (this.handlers.indexOf(handler) < 0) {
      this.handlers.push(handler)
    }
  }

  unsubscribe(handler) {
    const handlerIndex = this.handlers.indexOf(handler)
    if (handlerIndex >= 0) {
      this.handlers.splice(handlerIndex, 1)
    }
  }

  fireStateChange() {
    const state = this.state

    this.handlers.forEach(handler => handler(state))
  }
}

class StoryState extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    storyFn: PropTypes.func.isRequired,
    context: PropTypes.object
  }

  state = {
    // eslint-disable-next-line react/no-unused-state
    storyState: this.props.store.state
  }

  componentDidMount() {
    const {store} = this.props
    store.subscribe(this.handleStateChange)
  }

  componentWillUnmount() {
    const {store} = this.props
    store.unsubscribe(this.handleStateChange)
    store.reset()
  }

  handleStateChange = storyState => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({storyState})
  }

  render() {
    const {store, storyFn, context} = this.props

    const child = context ? storyFn(context) : storyFn(store)
    return React.isValidElement(child) ? child : child()
  }
}

export function withState(initialState) {
  const store = new Store(initialState)

  return storyFn => context => (
    <StoryState store={store} storyFn={storyFn} context={{...context, store}} />
  )
}
