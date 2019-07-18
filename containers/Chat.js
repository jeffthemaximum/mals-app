'use strict'

import { connect } from 'react-redux'
import ActionCable from 'action-cable-react-jwt'
import lodashDebounce from 'lodash/debounce'
import React, { Component } from 'react'
import SideMenu from 'react-native-side-menu'

import * as chatSerializers from '../services/serializers/chats'
import * as clientStorage from '../services/clientStorage'
import * as messageSerializers from '../services/serializers/messages'
import * as notificationSerializers from '../services/serializers/notifications'
import chats from '../ducks/chats'
import constants from '../constants'
import menu from '../ducks/menu'
import messages from '../ducks/messages'
import notifications from '../ducks/notifications'
import users from '../ducks/users'

import ChatComponent from '../components/Chat'
import Header from '../containers/Header'
import Menu from '../containers/Menu'

const {
  actions: { createChat, setChat },
  selectors: {
    chat: chatSelector,
    recipient: recipientSelector
  }
} = chats

const {
  actions: { toggleMenu },
  selectors: { isOpen: menuIsOpenSelector }
} = menu

const {
  actions: {
    createMessage,
    readMessage,
    setMessage,
    setMessages,
    updateMessage
  },
  selectors: { messages: messagesSelector }
} = messages

const {
  actions: { createNotification, setNotification },
  selectors: {
    typing: typingNotificationSelector,
    unsubscribeData: unsubscribeDataSelector
  }
} = notifications

const {
  selectors: { getUser: getUserSelector }
} = users

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Meet a Local Stranger',
    headerLeft: <Header navigation={navigation} />,
    headerTitleStyle: {
      fontFamily: 'ProximaNova-Regular'
    },
    gesturesEnabled: false
  })

  state = {
    cable: null,
    chatsCable: null,
    jwt: null,
    loading: false,
    messagesCable: null,
    notificationsCable: null
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
      const { chat, createNotification, user } = this.props

      this._connectToMessagesChannel()
      this._connectToNotificationsChannel()

      const handleStartTyping = () => {
        const notification = notificationSerializers.serialize({
          chatId: chat.id,
          notificationType: constants.NOTIFICATION_TYPES.typing,
          userId: user.id
        })
        createNotification(notification)
      }
      this.startTyping = lodashDebounce(handleStartTyping, 10000, {
        leading: true,
        trailing: false
      })

      const handleStopTyping = () => {
        const notification = notificationSerializers.serialize({
          chatId: chat.id,
          notificationType: constants.NOTIFICATION_TYPES.stopTyping,
          userId: user.id
        })
        createNotification(notification)
      }
      this.stopTyping = lodashDebounce(handleStopTyping, 10000)
    }
  }

  componentWillUnmount () {
    this.state.chatsCable.unsubscribe()
    this.state.messagesCable.unsubscribe()
    this.state.notificationsCable.unsubscribe()
  }

  _connectToChatsChannel = () => {
    const { cable } = this.state
    const { _handleReceivedChat } = this

    const handleConnected = () => {
      const { chat, createChat } = this.props
      if (!chat) {
        createChat()
      }
    }

    const chatsCable = cable.subscriptions.create(
      { channel: 'ChatsChannel' },
      {
        connected (connectedData) {
          handleConnected()
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
    const {
      _handleReceivedMessage,
      props: { chat },
      state: { cable }
    } = this

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

  _connectToNotificationsChannel = () => {
    const {
      _handleReceivedNotification,
      props: { chat },
      state: { cable }
    } = this

    const notificationsCable = cable.subscriptions.create(
      {
        channel: 'NotificationsChannel',
        chat: chat.id
      },
      {
        received (receivedData) {
          _handleReceivedNotification(receivedData)
        }
      }
    )

    this.setState({ cable, notificationsCable })
  }

  _detectTyping = text => {
    if (text !== '') {
      this._startTyping()
      this._stopTyping()
    } else if (text === '') {
      this._forceStopTypingNotification()
    }
  }

  _forceStopTypingNotification = () => {
    const { chat, createNotification, user } = this.props

    if (chat) {
      this.startTyping && this.startTyping.cancel()
      this.stopTyping && this.stopTyping.cancel()
      const notification = notificationSerializers.serialize({
        chatId: chat.id,
        notificationType: constants.NOTIFICATION_TYPES.stopTyping,
        userId: user.id
      })
      createNotification(notification)
    }
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
    const { readMessage, setMessage, updateMessage, user } = this.props

    const deserializedMessage = messageSerializers.deserialize(message)
    const isOwnMessage = deserializedMessage.user.id === user.id

    if (isOwnMessage) {
      updateMessage(deserializedMessage)
    } else {
      if (!deserializedMessage.received) {
        readMessage(message.id)
        setMessage(deserializedMessage)
      }
    }
  }

  _handleReceivedNotification = receivedData => {
    const { notification } = receivedData
    const { setNotification, user } = this.props

    const deserializedNotification = notificationSerializers.deserialize(
      notification
    )

    setNotification(deserializedNotification, user)
  }

  _handleSendMessage = messages => {
    const {
      chat,
      createMessage,
      setMessage
    } = this.props

    this._forceStopTypingNotification()

    const message = messages[messages.length - 1]
    setMessage(message)

    const messageData = messageSerializers.serialize(message, chat)
    createMessage(messageData)
  }

  _startTyping = () => {
    this.startTyping()
  }

  _stopTyping = () => {
    this.stopTyping()
  }

  render () {
    const { menuIsOpen, messages, notifications, recipient, toggleMenu, user } = this.props
    const menu = <Menu onItemSelected={toggleMenu} />

    return (
      <SideMenu
        menu={menu}
        isOpen={menuIsOpen}
        onChange={toggleMenu}
      >
        <ChatComponent
          detectTyping={this._detectTyping}
          handleSendMessage={this._handleSendMessage}
          messages={messages}
          notifications={notifications}
          recipient={recipient}
          user={user}
        />
      </SideMenu>
    )
  }
}

const mapStateToProps = state => {
  const chat = chatSelector(state)
  const menuIsOpen = menuIsOpenSelector(state)
  const messages = messagesSelector(state)
  const notifications = {
    typing: typingNotificationSelector(state),
    unsubscribed: unsubscribeDataSelector(state)
  }
  const recipient = recipientSelector(state)
  const user = getUserSelector(state)

  return {
    chat,
    menuIsOpen,
    messages,
    notifications,
    recipient,
    user
  }
}

const mapDispatchToProps = {
  createChat,
  createMessage,
  createNotification,
  readMessage,
  setChat,
  setMessage,
  setMessages,
  setNotification,
  toggleMenu,
  updateMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
