import * as actionTypes from './actionTypes'

export default function users (state = {}, action) {
  switch (action.type) {
    case actionTypes.SETUP:
    case actionTypes.UPDATE:
      return {
        ...state,
        error: false,
        loading: true
      }
    case actionTypes.SETUP_ERROR: {
      const { error } = action
      return {
        ...state,
        error: error,
        loading: false,
        user: null
      }
    }
    case actionTypes.UPDATE_ERROR: {
      const { error } = action
      return {
        ...state,
        error: error,
        loading: false
      }
    }
    case actionTypes.SETUP_SUCCESS:
    case actionTypes.UPDATE_SUCCESS:
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
