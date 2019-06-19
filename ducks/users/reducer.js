import * as actionTypes from './actionTypes'

export default function users (state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CREATE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        user: null
      }
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        user: action.user
      }
    default:
      return state
  }
}
