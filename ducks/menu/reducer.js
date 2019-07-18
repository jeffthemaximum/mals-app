import * as actionTypes from './actionTypes'

export default function messages (state = { open: false }, action) {
  switch (action.type) {
    case actionTypes.CLOSE:
      return {
        ...state,
        open: false
      }
    case actionTypes.OPEN:
      return {
        ...state,
        open: true
      }
    case actionTypes.TOGGLE:
      return {
        ...state,
        open: !state.open
      }
    default:
      return state
  }
}
