import * as actionTypes from './actionTypes'

export function createMessage (message) {
  return {
    type: actionTypes.CREATE,
    message
  }
}

export function getRandomMessage () {
  return {
    type: actionTypes.GET_RANDOM
  }
}

export function readMessage (messageId) {
  return {
    type: actionTypes.READ,
    messageId
  }
}

export function setMessage (message) {
  return {
    type: actionTypes.SET_MESSAGE,
    message
  }
}

export function setMessages (messages) {
  return {
    type: actionTypes.SET_MESSAGES,
    messages
  }
}

export function updateMessage (message, data) {
  return {
    type: actionTypes.UPDATE_MESSAGE,
    message,
    data
  }
}
