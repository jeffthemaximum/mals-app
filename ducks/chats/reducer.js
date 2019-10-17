import * as actionTypes from './actionTypes'
import * as locationActionTypes from '../location/actionTypes'

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
    case actionTypes.REPORT:
      return {
        ...state,
        reportError: false,
        reportLoading: true,
        reportSuccess: false
      }
    case actionTypes.REPORT_ERROR:
      return {
        ...state,
        reportError: true,
        reportLoading: false,
        reportSuccess: false
      }
    case actionTypes.REPORT_SUCCESS:
      return {
        ...state,
        reportError: false,
        reportLoading: false,
        reportSuccess: true
      }
    case actionTypes.RESET_REPORT:
      return {
        ...state,
        reportError: false,
        reportLoading: false,
        reportSuccess: false
      }
    case actionTypes.SET:
      return {
        ...state,
        chat: action.chat,
        error: null,
        loading: false
      }
    case actionTypes.SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case actionTypes.UNSET:
      return {
        chat: null,
        error: false,
        loading: false
      }

    case locationActionTypes.RECIPIENT_POINT_TO_WORDS_SUCCESS:
      const chatCopy = { ...state.chat }
      const recipient = action.recipient

      if (recipient) {
        const recipientCopy = chatCopy.users.find(user => user.id === recipient.id)
        const recipientIndex = chatCopy.users.findIndex(user => user.id === recipient.id)
        recipientCopy.locationName = action.name

        const usersCopy = [ ...chatCopy.users ]
        usersCopy[recipientIndex] = recipientCopy
        chatCopy.users = usersCopy

        return {
          ...state,
          chat: chatCopy
        }
      } else {
        return {
          ...state
        }
      }
    default:
      return state
  }
}
