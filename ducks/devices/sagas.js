import { call, put, takeLatest } from 'redux-saga/effects'

import * as clientStorageService from '../../services/clientStorage'
import * as deviceActionTypes from './actionTypes'
import * as deviceApi from './api'
import * as deviceSerializers from '../../services/serializers/devices'
import constants from '../../constants'

function * createDevice (action) {
  const { data } = action
  const response = yield call(deviceApi.createDevice, data)
  const { data: device, error } = response
  if (device) {
    const deserializedDevice = deviceSerializers.deserialize(device)
    yield call(clientStorageService.set, constants.DEVICE_UNIQUE_ID, deserializedDevice.uniqueId)
    yield put({ type: deviceActionTypes.CREATE_SUCCESS, device: deserializedDevice })
  } else {
    yield put({ type: deviceActionTypes.CREATE_ERROR, error })
  }
}

function * updateDevice (action) {
  const { data, deviceUniqueId } = action
  const response = yield call(deviceApi.updateDevice, deviceUniqueId, data)
  const { data: device, error } = response
  if (device) {
    const deserializedDevice = deviceSerializers.deserialize(device)
    yield put({ type: deviceActionTypes.UPDATE_SUCCESS, device: deserializedDevice })
  } else {
    yield put({ type: deviceActionTypes.UPDATE_ERROR, error })
  }
}

const watchers = [
  takeLatest(deviceActionTypes.CREATE, createDevice),
  takeLatest(deviceActionTypes.UPDATE, updateDevice)
]

export { createDevice, watchers }
