import * as actionTypes from './actionTypes'

export default function users (state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE:
    case actionTypes.UPDATE:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CREATE_ERROR:
    case actionTypes.UPDATE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        user: null
      }
    case actionTypes.CREATE_SUCCESS:
    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        user: action.user
      }
    case actionTypes.UNSET:
      return {
        error: false,
        loading: false,
        user: null
      }
    default:
      return state
  }
}
