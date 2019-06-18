import { call, put, takeLatest } from 'redux-saga/effects'

import * as clientStorageService from '../../services/clientStorage'
import * as userActionTypes from './actionTypes'
import * as userApi from './api'
import constants from '../../constants'

function * getOrCreateUser (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  console.log({ jwt })
  const response = yield call(userApi.getOrCreateUser, jwt)
  console.log({ response })
  const { user } = response
  if (user) {
    yield put({ type: userActionTypes.GET_OR_CREATE_SUCCESS, user })
  } else {
    const { error } = response
    yield put({ type: userActionTypes.GET_OR_CREATE_ERROR, error })
  }
}

const watchers = [takeLatest(userActionTypes.GET_OR_CREATE, getOrCreateUser)]

export { getOrCreateUser, watchers }
