import * as actionTypes from './actionTypes'
import constants from '../../constants'

const isOwnNotification = (notification, user) =>
  notification.actor.id === user.id
const isStopTypingNotification = notification =>
  notification.notificationType === constants.NOTIFICATION_TYPES.stopTyping
const isTypingNotification = notification =>
  notification.notificationType === constants.NOTIFICATION_TYPES.typing

export default function notifications (state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      const { notification, user } = action
      if (
        isTypingNotification(notification) &&
        !isOwnNotification(notification, user)
      ) {
        return {
          ...state,
          typingData: notification
        }
      } else if (
        isStopTypingNotification(notification) &&
        !isOwnNotification(notification, user)
      ) {
        return {
          ...state,
          typingData: null
        }
      } else {
        return state
      }
    default:
      return state
  }
}
