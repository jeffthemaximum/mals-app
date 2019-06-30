import { call, put, takeLatest } from 'redux-saga/effects'

import * as chatActionTypes from './actionTypes'
import * as chatApi from './api'
import * as clientStorageService from '../../services/clientStorage'
import constants from '../../constants'

function * createChat (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(chatApi.createChat, jwt)
  const { error } = response
  if (error) {
    yield put({ type: chatActionTypes.CREATE_ERROR, error })
  } else {
    yield put({ type: chatActionTypes.CREATE_SUCCESS })
  }
}

const watchers = [takeLatest(chatActionTypes.CREATE, createChat)]

export { createChat, watchers }
