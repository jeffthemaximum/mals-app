import * as actionTypes from './actionTypes'

export function createChat () {
  return {
    type: actionTypes.CREATE
  }
}

export function reportChat (chatId, content) {
  return {
    type: actionTypes.REPORT,
    chatId,
    content
  }
}

export function resetReportChat () {
  return {
    type: actionTypes.RESET_REPORT
  }
}

export function setChat (chat) {
  return {
    type: actionTypes.SET,
    chat
  }
}

export function setChatStatus (status) {
  return {
    type: actionTypes.SET_STATUS,
    status
  }
}

export function unsetChat () {
  return {
    type: actionTypes.UNSET
  }
}
