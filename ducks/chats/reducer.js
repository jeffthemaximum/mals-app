import * as actionTypes from './actionTypes'

export default function chats (state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CREATE_ERROR:
      return {
        ...state,
        chat: null,
        error: action.error,
        loading: false
      }
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: true // loading is true until we set chat
      }
    case actionTypes.SET:
      return {
        ...state,
        chat: action.chat,
        error: null,
        loading: false
      }
    case actionTypes.UNSET:
      return {
        chat: null,
        error: false,
        loading: false
      }
    default:
      return state
  }
}
