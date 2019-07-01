'use strict'

import { connect } from 'react-redux'
import ActionCable from 'action-cable-react-jwt'
import React, { Component } from 'react'

import * as chatSerializers from '../services/serializers/chats'
import * as clientStorage from '../services/clientStorage'
import * as messageSerializers from '../services/serializers/messages'
import chats from '../ducks/chats'
import constants from '../constants'
import messages from '../ducks/messages'
import users from '../ducks/users'

import ChatComponent from '../components/Chat'

const {
  actions: { createChat, setChat },
  selectors: { chat: chatSelector }
} = chats

const {
  actions: { createMessage, setMessage, setMessages, updateMessage },
  selectors: { messages: messagesSelector }
} = messages

const {
  selectors: { getUser: getUserSelector }
} = users

class Chat extends Component {
  static navigationOptions = {
    title: 'Meet a Local Stranger',
    headerLeft: null,
    headerTitleStyle: {
      fontFamily: 'ProximaNova-Regular'
    }
  }

  state = {
    cable: null,
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

  componentDidUpdate (prevProps) {
    if (!prevProps.chat && this.props.chat) {
      this._connectToMessagesChannel()
    }
  }

  componentWillUnmount () {
    this.state.chatsCable.unsubscribe()
    this.state.messagesCable.unsubscribe()
  }

  _connectToChatsChannel = () => {
    const { createChat } = this.props
    const { cable } = this.state
    const { _handleReceivedChat } = this
    const chatsCable = cable.subscriptions.create(
      { channel: 'ChatsChannel' },
      {
        connected (connectedData) {
          createChat()
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
    const { chat } = this.props
    const { cable } = this.state
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

    this.setState({ cable, messagesCable })
  }

  _handleReceivedChat = chat => {
    const { setChat, setMessages } = this.props

    chat = chatSerializers.deserialize(chat)
    const messages = chat.messages
    delete chat.messages

    setChat(chat)
    setMessages(messages)
  }

  _handleReceivedMessage = message => {
    const { setMessage, updateMessage, user } = this.props

    const deserializedMessage = messageSerializers.deserialize(message)
    const isOwnMessage = deserializedMessage.user.id === user.id

    if (isOwnMessage) {
      updateMessage(deserializedMessage)
    } else {
      setMessage(deserializedMessage)
    }
  }

  _handleSendMessage = messages => {
    const { chat, createMessage, setMessage } = this.props

    const message = messages[messages.length - 1]
    setMessage(message)

    const messageData = messageSerializers.serialize(message, chat)
    createMessage(messageData)
  }

  render () {
    const { chat, messages, user } = this.props

    return (
      <ChatComponent
        chat={chat}
        handleSendMessage={this._handleSendMessage}
        messages={messages}
        user={user}
      />
    )
  }
}

const mapStateToProps = state => {
  const chat = chatSelector(state)
  const messages = messagesSelector(state)
  const user = getUserSelector(state)

  return {
    chat,
    messages,
    user
  }
}

const mapDispatchToProps = {
  createChat,
  createMessage,
  setChat,
  setMessage,
  setMessages,
  updateMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
