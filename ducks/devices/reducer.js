import * as actionTypes from './actionTypes'

export default function device (state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.CREATE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: true
      }
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        device: action.device,
        error: null,
        loading: true
      }
    case actionTypes.SET:
      return {
        ...state,
        device: action.device
      }
    default:
      return state
  }
}
