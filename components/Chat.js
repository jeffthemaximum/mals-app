'use strict'

import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { renderAvatar } from './Avatar'
import { renderBubble } from './Bubble'
import { renderFooter } from './Footer'
import { renderSend } from './Send'

export default class Chat extends Component {
  render () {
    const {
      detectTyping,
      handleSendMessage,
      messages,
      notifications,
      user
    } = this.props

    const userData = {
      _id: user.id,
      name: user.name,
      avatar: user.avatar
    }

    const textStyle = {
      fontFamily: 'ProximaNova-Regular'
    }

    return (
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
  }
}
