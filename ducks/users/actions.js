import * as actionTypes from './actionTypes'

export function createUser () {
  return {
    type: actionTypes.CREATE
  }
}

export function updateUser ({ name }) {
  return {
    type: actionTypes.UPDATE,
    name
  }
}
