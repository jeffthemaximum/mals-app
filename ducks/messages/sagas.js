import { call, put, takeLatest } from 'redux-saga/effects'

import * as messageActionTypes from './actionTypes'
import * as messageApi from './api'
import * as clientStorageService from '../../services/clientStorage'
import constants from '../../constants'

function * createMessage (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(messageApi.createMessage, jwt, { message: action.message })
  const { error } = response
  if (error) {
    yield put({ type: messageActionTypes.CREATE_ERROR, error })
  } else {
    yield put({ type: messageActionTypes.CREATE_SUCCESS })
  }
}

const watchers = [takeLatest(messageActionTypes.CREATE, createMessage)]

export { createMessage, watchers }
