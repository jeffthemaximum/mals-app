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

function * readMessage (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const { messageId } = action
  const response = yield call(messageApi.readMessage, jwt, { messageId })
  const { error } = response
  if (error) {
    yield put({ type: messageActionTypes.READ_ERROR, error })
  } else {
    yield put({ type: messageActionTypes.READ_SUCCESS })
  }
}

const watchers = [
  takeLatest(messageActionTypes.CREATE, createMessage),
  takeLatest(messageActionTypes.READ, readMessage)
]

export { createMessage, watchers }
