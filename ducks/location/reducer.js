import * as actionTypes from './actionTypes'

export default function location (state = {}, action) {
  switch (action.type) {
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.SET:
      return {
        ...state,
        location: action.location
      }
    default:
      return state
  }
}
