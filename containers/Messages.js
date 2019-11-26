'use strict'

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import chats from '../ducks/chats'
import constants from '../constants'
import MessagesComponent from '../components/Messages'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  actions: { getChats },
  selectors: {
    chats: chatsSelector,
    error: errorSelector,
    loading: loadingSelector
  }
} = chats

class Messages extends Component {
  componentDidMount () {
    const handleFocus = this.handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )

    const handleBlur = this.handleBlur
    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        handleBlur()
      }
    )
  }

  handleBlur = () => {
    // TODO
    console.log('blur')
  }

  handleFocus = () => {
    const { getChats } = this.props

    getChats()
  }

  render () {
    const { chats, error, loading, user } = this.props

    console.log({ chats })

    return (
      <MessagesComponent
        chats={chats}
        error={error}
        loading={loading}
        user={user}
      />
    )
  }
}

const mapStateToProps = state => {
  const chats = chatsSelector(state)
  const error = errorSelector(state)
  const loading = loadingSelector(state)

  return {
    chats,
    error,
    loading
  }
}

const mapDispatchToProps = { getChats }

const enhance = compose(
  withNavigationName(constants.NAVIGATION_NAMES.messages),
  withUser,
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(Messages)
