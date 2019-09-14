import * as actionTypes from './actionTypes'

export default function navigation (state = { name: null }, action) {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: action.name
      }
    case actionTypes.UNSET_NAME:
      return {
        ...state,
        name: null
      }
    default:
      return state
  }
}
