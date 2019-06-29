import React from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'

const MessageCable = ({ chat, handleReceivedMessage }) => (
  <ActionCableConsumer
    key={chat.id}
    channel={{ channel: 'MessagesChannel', chat: chat.id }}
    onReceived={handleReceivedMessage}
  />
)

export default MessageCable
