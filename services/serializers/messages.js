import camelcaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'

export const deserialize = (message) => {
  const id = message.id
  message = { ...camelcaseKeys(message, { deep: true }) }
  message.createdAt = new Date(message.createdAt)
  message.user._id = message.user.id
  message._id = message.id
  message.id = id
  message.sent = message.sentAt
  message.received = message.deliveredAt
  return message
}

export const serialize = (message, chat, data = {}) => {
  message = { ...message }
  const {
    _id: clientId,
    text
  } = message

  return snakeCaseKeys({
    chatId: chat.id,
    clientId,
    text,
    ...data
  })
}
