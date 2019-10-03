'use strict'

import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { renderAvatar } from './Avatar'
import { renderBubble } from './Bubble'
import { renderFooter } from './Footer'
import { renderSend } from './Send'
import constants from '../constants'
import Waiting from '../containers/Waiting'
import withNavigationName from '../containers/withNavigationName'

let GiftedChatComponent = ({
  detectTyping,
  handleSendMessage,
  messages,
  notifications,
  textStyle,
  userData
}) => (
  <GiftedChat
    listViewProps={{
      notifications
    }}
    messages={messages}
    notifications={notifications}
    onInputTextChanged={detectTyping}
    onSend={messages => handleSendMessage(messages)}
    renderAvatar={renderAvatar}
    renderBubble={renderBubble}
    renderFooter={renderFooter}
    renderSend={renderSend}
    renderUsernameOnMessage
    showUserAvatar
    textStyle={textStyle}
    user={userData}
  />
)

GiftedChatComponent = withNavigationName(constants.NAVIGATION_NAMES.chat)(
  GiftedChatComponent
)

export default class Chat extends Component {
  render () {
    const {
      denyRequest,
      detectTyping,
      handleSendMessage,
      messages,
      notifications,
      startChat,
      status,
      user
    } = this.props

    let userData = {}
    if (user) {
      userData = {
        _id: user.id,
        avatarFile: user.avatar_file,
        avatarUrl: user.avatar_url,
        name: user.name
      }
    }

    const textStyle = {
      fontFamily: 'ProximaNova-Regular'
    }

    if (status === constants.RANDOM_CHAT_STATES.started) {
      return (
        <GiftedChatComponent
          detectTyping={detectTyping}
          handleSendMessage={handleSendMessage}
          messages={messages}
          notifications={notifications}
          textStyle={textStyle}
          userData={userData}
        />
      )
    } else {
      return (
        <Waiting
          denyRequest={denyRequest}
          startChat={startChat}
          status={status}
        />
      )
    }
  }
}
