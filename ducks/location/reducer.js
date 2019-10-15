import * as actionTypes from './actionTypes'

export default function location (state = {}, action) {
  switch (action.type) {
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.error
      }
    case actionTypes.POINT_TO_WORDS_SUCCESS:
      return {
        ...state,
        name: action.name
      }
    case actionTypes.SET:
    case actionTypes.GET_SUCCESS:
      return {
        ...state,
        location: action.location
      }
    default:
      return state
  }
}
