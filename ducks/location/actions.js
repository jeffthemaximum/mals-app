import * as actionTypes from './actionTypes'

export function setLocation (location) {
  return {
    type: actionTypes.SET,
    location
  }
}
