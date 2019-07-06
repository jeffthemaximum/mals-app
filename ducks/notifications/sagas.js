import { call, put, takeLatest } from 'redux-saga/effects'

import * as notificationsActionTypes from './actionTypes'
import * as notificationsApi from './api'
import * as clientStorageService from '../../services/clientStorage'
import constants from '../../constants'

function * createNotification (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(notificationsApi.createNotification, jwt, {
    notification: action.notification
  })
  const { error } = response
  if (error) {
    yield put({ type: notificationsActionTypes.CREATE_ERROR, error })
  } else {
    yield put({ type: notificationsActionTypes.CREATE_SUCCESS })
  }
}

const watchers = [
  takeLatest(notificationsActionTypes.CREATE, createNotification)
]

export { createNotification, watchers }
