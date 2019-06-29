'use strict'

import { connect } from 'react-redux'
import ActionCable from 'action-cable-react-jwt'
import React, { Component } from 'react'
import snakeCaseKeys from 'snakecase-keys'

import * as clientStorage from '../services/clientStorage'
import chats from '../ducks/chats'
import constants from '../constants'
import users from '../ducks/users'

import ChatComponent from '../components/Chat'

const {
  api: { createChat, sendMessage }
} = chats

const {
  selectors: { getUser: getUserSelector }
} = users

class Chat extends Component {
  state = {
    cable: null,
    chat: null,
    chatsCable: null,
    jwt: null,
    loading: false,
    messagesCable: null
  }

  async componentDidMount () {
    const jwt = await clientStorage.get(constants.JWT)
    const cable = ActionCable.createConsumer(constants.API_WS_ROOT, jwt)
    this.setState({ cable }, () => {
      this._connectToChatsChannel()
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.chat && this.state.chat) {
      this._connectToMessagesChannel()
    }
  }

  _connectToChatsChannel = () => {
    const { cable } = this.state
    const { _createChat, _handleReceivedChat } = this
    const chatsCable = cable.subscriptions.create(
      { channel: 'ChatsChannel' },
      {
        connected (connectedData) {
          _createChat()
        },
        received (receivedData) {
          const { chat } = receivedData
          _handleReceivedChat(chat)
        }
      }
    )

    this.setState({ cable, chatsCable })
  }

  _connectToMessagesChannel = () => {
    const { cable, chat } = this.state
    const { _handleReceivedMessage } = this
    const messagesCable = cable.subscriptions.create(
      {
        channel: 'MessagesChannel',
        chat: chat.id
      },
      {
        received (receivedData) {
          const { message } = receivedData
          _handleReceivedMessage(message)
        }
      }
    )

    this.setState({ messagesCable })
  }

  _createChat = async () => {
    const { chat, loading } = this.state

    if (!loading && !chat) {
      this.setState({ loading: true })
      const jwt = await clientStorage.get(constants.JWT)
      await createChat(jwt)
      this.setState({ loading: false })
    }
  }

  _handleReceivedChat = chat => {
    this.setState({
      chat
    })
  }

  _handleReceivedMessage = message => {
    const chat = { ...this.state.chat }
    chat.messages = [message, ...chat.messages]
    this.setState({ chat })
  }

  _handleSendMessage = async messages => {
    const { chat } = this.state

    const message = messages.sort(function compare (a, b) {
      return b - a
    })[0]

    const jwt = await clientStorage.get(constants.JWT)

    const {
      _id: clientId,
      text,
      user: {
        _id: userId
      }
    } = message

    const messageData = snakeCaseKeys({
      chatId: chat.id,
      clientId,
      text,
      userId
    })
    await sendMessage(jwt, messageData)
  }

  render () {
    const { chat } = this.state
    const { user } = this.props

    return <ChatComponent chat={chat} handleSendMessage={this._handleSendMessage} user={user} />
  }
}

const mapStateToProps = state => {
  const user = getUserSelector(state)

  return {
    user
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
