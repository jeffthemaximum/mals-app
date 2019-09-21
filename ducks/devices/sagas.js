import { call, fork, put, race, take, takeLatest } from 'redux-saga/effects'
import lodashGet from 'lodash/get'

import * as clientStorageService from '../../services/clientStorage'
import * as deviceActionTypes from './actionTypes'
import * as deviceApi from './api'
import * as deviceInfoService from '../../services/deviceInfoService'
import * as deviceSerializers from '../../services/serializers/devices'
import constants from '../../constants'

function * createDevice (action) {
  const { data } = action
  const response = yield call(deviceApi.createDevice, data)
  const { data: device, error } = response
  if (device) {
    yield put({ type: deviceActionTypes.CREATE_SUCCESS, device })
  } else {
    yield put({ type: deviceActionTypes.CREATE_ERROR, error })
  }
}

function * getOrCreateDevice (action) {
  const { storedDeviceData } = action

  if (lodashGet(storedDeviceData, 'uniqueId')) {
    yield call(
      clientStorageService.set,
      constants.DEVICE_UNIQUE_ID,
      storedDeviceData.uniqueId
    )
    yield put({
      type: deviceActionTypes.GET_OR_CREATE_SUCCESS,
      device: storedDeviceData
    })
  } else {
    let deviceInfo
    const storedDeviceUniqueId = yield call(
      clientStorageService.get,
      constants.DEVICE_UNIQUE_ID
    )
    if (storedDeviceUniqueId) {
      deviceInfo = { uniqueId: storedDeviceUniqueId }
    } else {
      deviceInfo = yield call(deviceInfoService.getInfo)
    }

    const serializedData = yield call(deviceSerializers.serialize, deviceInfo)
    yield fork(createDevice, { data: serializedData })
    const { apiSuccess, apiError } = yield race({
      apiSuccess: take(deviceActionTypes.CREATE_SUCCESS),
      apiError: take(deviceActionTypes.CREATE_ERROR)
    })

    if (apiSuccess) {
      const { device } = apiSuccess
      const deserializedDevice = deviceSerializers.deserialize(device)
      yield call(
        clientStorageService.set,
        constants.DEVICE_UNIQUE_ID,
        deserializedDevice.uniqueId
      )
      yield put({
        type: deviceActionTypes.GET_OR_CREATE_SUCCESS,
        device: deserializedDevice
      })
    } else {
      const { error } = apiError
      yield put({ type: deviceActionTypes.GET_OR_CREATE_ERROR, error })
    }
  }
}

function * updateDevice (action) {
  const { data, deviceUniqueId } = action
  const response = yield call(deviceApi.updateDevice, deviceUniqueId, data)
  const { data: device, error } = response
  if (device) {
    const deserializedDevice = deviceSerializers.deserialize(device)
    yield put({
      type: deviceActionTypes.UPDATE_SUCCESS,
      device: deserializedDevice
    })
  } else {
    yield put({ type: deviceActionTypes.UPDATE_ERROR, error })
  }
}

const watchers = [
  takeLatest(deviceActionTypes.CREATE, createDevice),
  takeLatest(deviceActionTypes.GET_OR_CREATE, getOrCreateDevice),
  takeLatest(deviceActionTypes.UPDATE, updateDevice)
]

export { createDevice, getOrCreateDevice, watchers }
