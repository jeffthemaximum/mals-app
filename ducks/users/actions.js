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

export function setupUser (data) {
  return {
    type: actionTypes.SETUP,
    data
  }
}

export function updateUser ({ name }) {
  return {
    type: actionTypes.UPDATE,
    name
  }
}
