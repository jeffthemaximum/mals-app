import * as actionTypes from './actionTypes'

export function createNotification (notification) {
  return {
    type: actionTypes.CREATE,
    notification
  }
}

export function setNotification (notification, user) {
  return {
    type: actionTypes.SET_NOTIFICATION,
    notification,
    user
  }
}
