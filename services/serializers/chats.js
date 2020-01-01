import * as initialAdminMessageService from '../initialAdminMessageService'
import * as messageSerializers from './messages'

export const deserialize = (chat) => {
  chat = { ...chat }
  chat.messages = [...chat.messages].map(message => messageSerializers.deserialize(message))

  // when returning to a chat, we sometimes have duplicate initial admin messages
  // so we don't display them
  let initialAdminMessage
  for (let len = chat.messages.length, i = len - 1; i >= 0; i--) {
    const message = chat.messages[i]
    if (initialAdminMessageService.isInitialAdminMessage(message)) {
      initialAdminMessage = message
      break
    }
  }

  if (initialAdminMessage) {
    chat.messages = chat.messages.filter(message => !initialAdminMessageService.isInitialAdminMessage(message))
    chat.messages.push(initialAdminMessage)
  }

  return chat
}
