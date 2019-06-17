import { call, put, takeLatest } from 'redux-saga/effects'
import * as userActionTypes from './actionTypes'

function * getOrCreateUser (action) {
  const user = { name: 'jeff' }
  if (user) {
    yield put({ type: userActionTypes.GET_OR_CREATE_SUCCESS, user })
  } else {
    yield put({ type: userActionTypes.GET_OR_CREATE_ERROR })
  }
}

const watchers = [takeLatest(userActionTypes.GET_OR_CREATE, getOrCreateUser)]

export { getOrCreateUser, watchers }
