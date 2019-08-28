import { call, put, takeLatest } from 'redux-saga/effects'

import * as clientStorageService from '../../services/clientStorage'
import * as deviceActionTypes from './actionTypes'
import * as deviceApi from './api'
import constants from '../../constants'

function * createDevice (action) {
  const { data } = action
  const response = yield call(deviceApi.createDevice, data)
  const { data: device, error } = response
  if (device) {
    yield call(clientStorageService.set, constants.DEVICE_UNIQUE_ID, device.unique_id)
    yield put({ type: deviceActionTypes.CREATE_SUCCESS, device })
  } else {
    yield put({ type: deviceActionTypes.CREATE_ERROR, error })
  }
}

const watchers = [
  takeLatest(deviceActionTypes.CREATE, createDevice)
]

export { createDevice, watchers }
