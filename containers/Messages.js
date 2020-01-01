'use strict'

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'

import chats from '../ducks/chats'
import constants from '../constants'
import messages from '../ducks/messages'
import MessagesComponent from '../components/Messages'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  actions: { getChats, setChat, setChatStatus },
  selectors: {
    chats: chatsSelector,
    error: errorSelector,
    loading: loadingSelector
  }
} = chats

const {
  actions: {
    setMessages
  }
} = messages

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

  handleChatPress = (chat) => {
    const {
      navigation: { navigate },
      setChat,
      setChatStatus,
      setMessages
    } = this.props

    setChat(chat)
    setMessages(chat.messages)
    setChatStatus(constants.RANDOM_CHAT_STATES.started)
    navigate(constants.NAVIGATION_NAMES.pastChat)
  }

  render () {
    const { chats, error, loading, user } = this.props

    return (
      <MessagesComponent
        chats={chats}
        error={error}
        handleChatPress={this.handleChatPress}
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

const mapDispatchToProps = { getChats, setChat, setChatStatus, setMessages }

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
