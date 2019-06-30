'use strict'

import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends Component {
  render () {
    const {
      chat,
      handleSendMessage,
      user
    } = this.props

    const messages = chat ? chat.messages : []

    const userData = {
      _id: user.id,
      name: user.name
    }

    return (
      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSendMessage(messages)}
        renderAvatar={null}
        renderUsernameOnMessage={true}
        user={userData}
      />
    )
  }
}
