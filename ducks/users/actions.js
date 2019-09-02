import * as actionTypes from './actionTypes'

export function createUser (data) {
  return {
    type: actionTypes.CREATE,
    data
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
