'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import ActionCable from 'action-cable-react-jwt'
import hoistNonReactStatics from 'hoist-non-react-statics'
import lodashDebounce from 'lodash/debounce'
import React, { Component } from 'react'

import * as clientStorage from '../services/clientStorage'
import * as messageSerializers from '../services/serializers/messages'
import * as notificationSerializers from '../services/serializers/notifications'
import ChatComponent from '../components/Chat'
import chats from '../ducks/chats'
import constants from '../constants'
import Header from '../containers/Header'
import messages from '../ducks/messages'
import notifications from '../ducks/notifications'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  actions: { setChatStatus, unsetChat },
  selectors: {
    chat: chatSelector,
    chatStatus: chatStatusSelector,
    recipient: recipientSelector
  }
} = chats

const {
  actions: {
    createMessage,
    readMessage,
    setMessage,
    updateMessage
  },
  selectors: { messages: messagesSelector }
} = messages

const {
  actions: { createNotification, setNotification, unsetNotifications },
  selectors: {
    typing: typingNotificationSelector,
    unsubscribeData: unsubscribeDataSelector
  }
} = notifications

class PastChat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SayHey',
    headerLeft: ({ tintColor }) => (
      <Header navigation={navigation} tintColor={tintColor} />
    ),
    headerTitleStyle: {
      fontFamily: 'ProximaNova-Regular'
    }
  })

  state = {
    cable: null,
    jwt: null,
    loading: false,
    messagesCable: null,
    notificationsCable: null
  }

  componentDidMount () {
    const handleFocus = this._handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )

    const handleBlur = this._handleBlur
    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        handleBlur()
      }
    )
  }

  _handleBlur = () => {
    const { setChatStatus, unsetChat, unsetNotifications } = this.props

    this.startTyping && this.startTyping.cancel()
    this.state.messagesCable && this.state.messagesCable.unsubscribe()
    this.state.notificationsCable &&
      this.state.notificationsCable.unsubscribe()
    this.stopTyping && this.stopTyping.cancel()
    this.stopChat()
    unsetChat()
    unsetNotifications()
    setChatStatus(null)
  }

  _handleFocus = async () => {
    const { chat, createNotification, user } = this.props

    const jwt = await clientStorage.get(constants.JWT)
    const cable = ActionCable.createConsumer(constants.API_WS_ROOT, jwt)

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

    this.setState({ cable }, () => {
      this.connectToMessagesChannel()
      this.connectToNotificationsChannel()
    })
  }

  connectToMessagesChannel = () => {
    const {
      handleReceivedMessage,
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
          handleReceivedMessage(message)
        }
      }
    )

    this.setState({ cable, messagesCable })
  }

  connectToNotificationsChannel = () => {
    const {
      handleReceivedNotification,
      markAllMessagesReceived,
      props: { chat },
      state: { cable }
    } = this

    const notificationsCable = cable.subscriptions.create(
      {
        channel: 'NotificationsChannel',
        chat: chat.id
      },
      {
        connected () {
          markAllMessagesReceived()
        },
        received (receivedData) {
          handleReceivedNotification(receivedData)
        }
      }
    )

    this.setState({ cable, notificationsCable })
  }

  detectTyping = text => {
    if (text !== '') {
      this.startTyping()
      this.stopTyping()
    } else if (text === '') {
      this.forceStopTypingNotification()
    }
  }

  forceStopTypingNotification = () => {
    const { chat, createNotification, user } = this.props

    this.startTyping && this.startTyping.cancel()
    this.stopTyping && this.stopTyping.cancel()
    const notification = notificationSerializers.serialize({
      chatId: chat.id,
      notificationType: constants.NOTIFICATION_TYPES.stopTyping,
      userId: user.id
    })
    createNotification(notification)
  }

  handleReceivedMessage = message => {
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

  handleReceivedNotification = receivedData => {
    const { notification } = receivedData
    const { setNotification, user } = this.props

    const deserializedNotification = notificationSerializers.deserialize(
      notification
    )

    setNotification(deserializedNotification, user)
  }

  handleSendMessage = messages => {
    const { chat, createMessage, setMessage } = this.props

    this.forceStopTypingNotification()

    const message = messages[messages.length - 1]
    setMessage(message)

    const messageData = messageSerializers.serialize(message, chat)
    createMessage(messageData)
  }

  markAllMessagesReceived = () => {
    const { chat, readMessage, user } = this.props

    for (let message of chat.messages) {
      const isOwnMessage = message.user.id === user.id

      if (!isOwnMessage && !message.received) {
        readMessage(message.id)
      }
    }
  }

  startChat = () => {
    const { setChatStatus } = this.props
    setChatStatus(constants.RANDOM_CHAT_STATES.started)
  }

  stopChat = () => {
    const { setChatStatus } = this.props
    setChatStatus(null)
  }

  viewProfile = () => {
    const { navigation, setChatStatus } = this.props

    setChatStatus(constants.RANDOM_CHAT_STATES.viewingProfile)
    navigation.navigate(constants.NAVIGATION_NAMES.profileOther)
  }

  render () {
    const { chatStatus, messages, notifications, user } = this.props

    return (
      <ChatComponent
        detectTyping={this.detectTyping}
        handleSendMessage={this.handleSendMessage}
        messages={messages}
        notifications={notifications}
        status={chatStatus}
        startChat={this.startChat}
        user={user}
        viewProfile={this.viewProfile}
      />
    )
  }
}

const mapStateToProps = state => {
  const chat = chatSelector(state)
  const chatStatus = chatStatusSelector(state)
  const messages = messagesSelector(state)
  const notifications = {
    typing: typingNotificationSelector(state),
    unsubscribed: unsubscribeDataSelector(state)
  }
  const recipient = recipientSelector(state)

  return {
    chat,
    chatStatus,
    messages,
    notifications,
    recipient
  }
}

const mapDispatchToProps = {
  createMessage,
  createNotification,
  readMessage,
  setChatStatus,
  setMessage,
  setNotification,
  unsetChat,
  unsetNotifications,
  updateMessage
}

const enhance = compose(
  withNavigationName(constants.NAVIGATION_NAMES.pastChat),
  withUser,
  connect(mapStateToProps, mapDispatchToProps)
)

export default hoistNonReactStatics(enhance(PastChat), PastChat)
