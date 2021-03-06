import * as actionTypes from './actionTypes'

export default function users (state = {}, action) {
  switch (action.type) {
    case actionTypes.RESET_AVATAR:
      const { file, url, user } = action
      const newUser = { ...user }
      if (file) {
        newUser.avatar_file = file
      }
      if (url) {
        newUser.avatar_url = url
      }
      return {
        ...state,
        user: newUser
      }
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
        created: action.created,
        error: false,
        loading: false,
        user: action.user
      }
    default:
      return state
  }
}
