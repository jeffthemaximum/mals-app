import * as actionTypes from './actionTypes'

export function setName (name) {
  return {
    type: actionTypes.SET_NAME,
    name
  }
}

export function unsetName () {
  return {
    type: actionTypes.UNSET_NAME
  }
}
