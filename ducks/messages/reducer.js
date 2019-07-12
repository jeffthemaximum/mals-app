import * as actionTypes from './actionTypes'

export default function messages (state = { messages: [] }, action) {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        error: false,
        loading: true
      }
    case actionTypes.CREATE_ERROR:
      return {
        ...state,
        error: true,
        loading: false
      }
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: true
      }
    case actionTypes.GET_RANDOM_SUCCESS:
      return {
        ...state,
        randomMessage: action.message
      }
    case actionTypes.SET_MESSAGE: {
      const messages = [action.message, ...state.messages]
      return {
        ...state,
        error: false,
        loading: false,
        messages
      }
    }
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        error: false,
        loading: false,
        messages: action.messages
      }
    case actionTypes.UPDATE_MESSAGE: {
      const messages = [...state.messages]
      const messageIndex = messages.findIndex(message => message._id === action.message._id)
      messages[messageIndex] = action.message
      return {
        ...state,
        messages
      }
    }
    default:
      return state
  }
}
