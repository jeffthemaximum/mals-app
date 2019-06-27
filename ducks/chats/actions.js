import * as actionTypes from './actionTypes'

export function createChat ({name}) {
  return {
    type: actionTypes.CREATE,
    name
  }
}
