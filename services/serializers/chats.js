import * as messageSerializers from './messages'

export const deserialize = (chat) => {
  chat = { ...chat }
  chat.messages = [...chat.messages].map(message => messageSerializers.deserialize(message))
  return chat
}
