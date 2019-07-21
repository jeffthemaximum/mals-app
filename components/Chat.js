'use strict'

import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { renderAvatar } from './Avatar'
import { renderBubble } from './Bubble'
import { renderFooter } from './Footer'
import { renderSend } from './Send'
import Waiting from '../containers/Waiting'

export default class Chat extends Component {
  render () {
    const {
      detectTyping,
      handleSendMessage,
      messages,
      notifications,
      recipient,
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

    if (recipient) {
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
    } else {
      return <Waiting />
    }
  }
}
