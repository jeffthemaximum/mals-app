import * as initialAdminMessageService from '../initialAdminMessageService'
import * as messageSerializers from './messages'

export const deserialize = (chat) => {
  chat = { ...chat }
  chat.messages = [...chat.messages].map(message => messageSerializers.deserialize(message))

  // when returning to a chat, we sometimes have duplicate initial admin messages
  // so we don't display them
  let initialAdminMessageCount = 0
  for (let len = chat.messages.length, i = len - 1; i >= 0; i--) {
    const message = chat.messages[i]
    if (initialAdminMessageService.isInitialAdminMessage(message)) {
      initialAdminMessageCount += 1
    } else {
      break
    }
  }

  if (initialAdminMessageCount > 1) {
    chat.messages.splice(chat.messages.length - initialAdminMessageCount + 1, chat.messages.length)
  }

  return chat
}
