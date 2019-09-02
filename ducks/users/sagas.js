import { call, put, takeLatest } from 'redux-saga/effects'

import * as clientStorageService from '../../services/clientStorage'
import * as userActionTypes from './actionTypes'
import * as userApi from './api'
import constants from '../../constants'
import navigationService from '../../services/navigationService'

function * createUser (action) {
  const { data } = action
  const response = yield call(userApi.createUser, data)
  const { data: user, error } = response
  if (user) {
    const { jwt } = user
    yield call(clientStorageService.set, constants.JWT, jwt)
    yield put({ type: userActionTypes.CREATE_SUCCESS, user })
  } else {
    yield put({ type: userActionTypes.CREATE_ERROR, error })
  }
}

function * updateUser (action) {
  const { name } = action
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(userApi.updateUser, jwt, { name })
  const { data: user, error } = response
  if (user) {
    const { jwt } = user
    yield call(clientStorageService.set, constants.JWT, jwt)
    yield put({ type: userActionTypes.UPDATE_SUCCESS, user })
    yield call(navigationService.navigate, 'Chat')
  } else {
    yield put({ type: userActionTypes.UPDATE_ERROR, error })
  }
}

const watchers = [
  takeLatest(userActionTypes.CREATE, createUser),
  takeLatest(userActionTypes.UPDATE, updateUser)
]

export { createUser, updateUser, watchers }
