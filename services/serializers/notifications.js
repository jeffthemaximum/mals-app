import snakeCaseKeys from 'snakecase-keys'

export const deserialize = notification => {
  const {
    notification_type: notificationType,
    user: actor
  } = notification

  return {
    actor,
    notificationType
  }
}

export const serialize = ({ chatId, notificationType, userId }) => {
  return snakeCaseKeys({
    chatId,
    notificationType,
    userId
  })
}
