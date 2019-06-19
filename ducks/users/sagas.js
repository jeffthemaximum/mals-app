import { call, put, takeLatest } from 'redux-saga/effects'

import * as clientStorageService from '../../services/clientStorage'
import * as userActionTypes from './actionTypes'
import * as userApi from './api'
import constants from '../../constants'

function * createUser (action) {
  const user = yield call(userApi.createUser)
  if (user) {
    const { jwt } = user
    yield call(clientStorageService.set, constants.JWT, jwt)
    yield put({ type: userActionTypes.CREATE_SUCCESS, user })
  } else {
    const { error } = response
    yield put({ type: userActionTypes.CREATE_ERROR, error })
  }
}

const watchers = [takeLatest(userActionTypes.CREATE, createUser)]

export { createUser, watchers }
