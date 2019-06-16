import * as actionTypes from './actionTypes'

export function getOrCreateUser (jwt) {
  return {
    type: actionTypes.GET_OR_CREATE,
    jwt
  }
}
