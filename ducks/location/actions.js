import * as actionTypes from './actionTypes'

export function setLocation (location) {
  return {
    type: actionTypes.SET,
    location
  }
}

export function setLocationError (error) {
  return {
    type: actionTypes.ERROR,
    error
  }
}
