import camelcaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'

export const deserialize = (message) => {
  message = { ...camelcaseKeys(message, { deep: true }) }
  message.createdAt = new Date(message.createdAt)
  message.user._id = message.user.id
  message._id = message.id
  return message
}

export const serialize = (message, chat) => {
  message = { ...message }
  const {
    _id: clientId,
    text,
    user: {
      _id: userId
    }
  } = message

  return snakeCaseKeys({
    chatId: chat.id,
    clientId,
    text,
    userId
  })
}
