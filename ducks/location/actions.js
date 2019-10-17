import * as actionTypes from './actionTypes'

export function pointToWords (data) {
  return {
    type: actionTypes.POINT_TO_WORDS,
    data
  }
}

export function recipientPointToWords (data) {
  return {
    type: actionTypes.RECIPIENT_POINT_TO_WORDS,
    data
  }
}

export function setLocation (location) {
  return {
    type: actionTypes.SET,
    location
  }
}
