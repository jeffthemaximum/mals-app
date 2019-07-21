import * as actionTypes from './actionTypes'

export function createChat () {
  return {
    type: actionTypes.CREATE
  }
}

export function setChat (chat) {
  return {
    type: actionTypes.SET,
    chat
  }
}

export function unsetChat () {
  return {
    type: actionTypes.UNSET
  }
}
