import * as actionTypes from './actionTypes'

export function getOrCreateUser (data) {
  return {
    type: actionTypes.GET_OR_CREATE,
    data
  }
}

export function hideUsers (recipientId) {
  return {
    type: actionTypes.HIDE,
    recipientId
  }
}

export function resetAvatar ({ file, url, user }) {
  return {
    type: actionTypes.RESET_AVATAR,
    file,
    url,
    user
  }
}

export function setupUser (data) {
  return {
    type: actionTypes.SETUP,
    data
  }
}

export function updateUser ({ avatar, avatarFile, avatarUrl, name }) {
  return {
    type: actionTypes.UPDATE,
    avatar,
    avatarFile,
    avatarUrl,
    name
  }
}
