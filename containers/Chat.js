'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import chats from '../ducks/chats'
import users from '../ducks/users'

import ChatComponent from '../components/Chat'

const {
  selectors: {
    chat: chatSelector,
    error: errorSelector,
    loading: loadingSelector,
    recipient: recipientSelector
  }
} = chats

const {
  selectors: { getUser: getUserSelector }
} = users

class Chat extends Component {
  render () {
    return (
      <ChatComponent {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  const chat = chatSelector(state)
  const error = errorSelector(state)
  const loading = loadingSelector(state)
  const recipient = recipientSelector(state)
  const user = getUserSelector(state)

  return {
    chat,
    error,
    loading,
    recipient,
    user
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
