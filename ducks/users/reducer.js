import * as actionTypes from './actionTypes'

export default function users (state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_OR_CREATE:
      return {
        ...state,
        loading: true
      }
    case actionTypes.GET_OR_CREATE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        user: null
      }
    case actionTypes.GET_OR_CREATE_SUCCESS:
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
