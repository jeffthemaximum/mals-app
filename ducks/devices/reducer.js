import * as actionTypes from './actionTypes'

export default function device (state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_OR_CREATE:
    case actionTypes.UPDATE:
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.GET_OR_CREATE_ERROR:
    case actionTypes.UPDATE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: true
      }
    case actionTypes.GET_OR_CREATE_SUCCESS:
      return {
        ...state,
        device: action.device,
        error: null,
        loading: false
      }
    case actionTypes.UPDATE_SUCCESS:
      const storedDevice = state.device
      const receivedDevice = action.device

      const updatedDevice = {
        ...storedDevice,
        ...receivedDevice
      }

      return {
        ...state,
        device: updatedDevice,
        error: null,
        loading: false
      }
    default:
      return state
  }
}
