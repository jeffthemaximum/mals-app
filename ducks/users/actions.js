import * as actionTypes from './actionTypes'

export function createUser ({ location }) {
  return {
    type: actionTypes.CREATE,
    location
  }
}

export function unsetUser () {
  return {
    type: actionTypes.UNSET
  }
}

export function updateUser ({ name }) {
  return {
    type: actionTypes.UPDATE,
    name
  }
}
