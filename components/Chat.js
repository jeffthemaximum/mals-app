'use strict'

import React, { Component } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { renderBubble } from './Bubble'
import { renderSend } from './Send'

export default class Chat extends Component {
  render () {
    const {
      handleSendMessage,
      messages,
      user
    } = this.props

    const userData = {
      _id: user.id,
      name: user.name
    }

    const textStyle = {
      fontFamily: 'ProximaNova-Regular'
    }

    return (
      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSendMessage(messages)}
        renderAvatar={null}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderUsernameOnMessage={true}
        textStyle={textStyle}
        user={userData}
      />
    )
  }
}
