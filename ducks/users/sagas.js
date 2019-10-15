import { call, fork, put, race, take, takeLatest } from 'redux-saga/effects'
import lodashGet from 'lodash/get'
import snakeCaseKeys from 'snakecase-keys'

import * as clientStorageService from '../../services/clientStorage'
import * as userActionTypes from './actionTypes'
import * as userApi from './api'
import constants from '../../constants'
import devices from '../devices'
import location from '../location'
import * as deviceSerializer from '../../services/serializers/devices'
import * as locationSerializer from '../../services/serializers/location'
import navigationService from '../../services/navigationService'

const { actionTypes: deviceActionTypes, sagas: deviceSagas } = devices
const { actionTypes: locationActionTypes, sagas: locationSagas } = location

function * createUser (action) {
  let { data } = action

  yield fork(locationSagas.getLocation)
  // eslint-disable-next-line no-unused-vars
  const { locationError, locationSuccess } = yield race({
    locationError: take(locationActionTypes.GET_ERROR),
    locationSuccess: take(locationActionTypes.GET_SUCCESS)
  })

  if (locationSuccess) {
    data = {
      ...data,
      ...locationSerializer.serialize(locationSuccess.location)
    }
  }

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

function * fetchUser (action) {
  const { jwt } = action
  const response = yield call(userApi.fetchUser, jwt)
  const { data: user, error, status } = response
  if (user) {
    const { jwt } = user
    yield call(clientStorageService.set, constants.JWT, jwt)
    yield put({ type: userActionTypes.FETCH_SUCCESS, user })
  } else {
    yield put({ type: userActionTypes.FETCH_ERROR, error, status })
  }
}

function * getOrCreateUser (action) {
  const { data } = action
  const jwt = yield call(clientStorageService.get, constants.JWT)

  if (jwt) {
    yield fork(fetchUser, { jwt })
  } else {
    yield fork(createUser, { data })
  }

  const res = yield race({
    createdUser: take(userActionTypes.CREATE_SUCCESS),
    fetchedUser: take(userActionTypes.FETCH_SUCCESS),
    createError: take(userActionTypes.CREATE_ERROR),
    fetchError: take(userActionTypes.FETCH_ERROR)
  })

  const { createError, createdUser, fetchedUser, fetchError } = res

  const user = lodashGet(createdUser || fetchedUser, 'user')
  const error = lodashGet(createError || fetchError, 'error')

  const created = !!lodashGet(createdUser, 'user')

  if (user) {
    const { jwt } = user
    yield call(clientStorageService.set, constants.JWT, jwt)
    yield put({ type: userActionTypes.GET_OR_CREATE_SUCCESS, user, created })
  } else {
    const status = fetchError ? fetchError.status : null
    yield put({ type: userActionTypes.GET_OR_CREATE_ERROR, error, status })
  }
}

function * hideUsers (action) {
  const { recipientId } = action
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(userApi.hideUsers, jwt, recipientId)
  const { error } = response
  if (error) {
    yield put({ type: userActionTypes.HIDE_ERROR })
  } else {
    yield put({ type: userActionTypes.HIDE_SUCCESS })
  }
}

function * setupUser (action) {
  // yield call(clientStorageService.clear)

  let { data } = action
  yield fork(deviceSagas.getOrCreateDevice, { storedDeviceData: data })
  // eslint-disable-next-line no-unused-vars
  const { deviceError, deviceSuccess } = yield race({
    deviceError: take(deviceActionTypes.GET_OR_CREATE_ERROR),
    deviceSuccess: take(deviceActionTypes.GET_OR_CREATE_SUCCESS)
  })

  if (deviceSuccess) {
    data = { ...data, ...deviceSerializer.serialize(deviceSuccess.device) }
  }

  yield fork(getOrCreateUser, { data })
  // eslint-disable-next-line no-unused-vars
  const { userError, userSuccess } = yield race({
    userError: take(userActionTypes.GET_OR_CREATE_ERROR),
    userSuccess: take(userActionTypes.GET_OR_CREATE_SUCCESS)
  })

  if (userSuccess) {
    const { user, created } = userSuccess
    yield put({ type: userActionTypes.SETUP_SUCCESS, user, created })
  } else {
    yield put({ type: userActionTypes.SETUP_ERROR })

    if (lodashGet(userError, 'status') === 401) {
      yield call(clientStorageService.remove, constants.JWT)
      yield call(navigationService.navigate, constants.NAVIGATION_NAMES.home)
    }
  }
}

function * updateUser (action) {
  const { avatar, avatarFile, avatarUrl, location: shouldUpdateLocation, name } = action

  let data = snakeCaseKeys({ avatar, avatarFile, avatarUrl, name })

  if (shouldUpdateLocation) {
    yield fork(locationSagas.getLocation)
    // eslint-disable-next-line no-unused-vars
    const { locationError, locationSuccess } = yield race({
      locationError: take(locationActionTypes.GET_ERROR),
      locationSuccess: take(locationActionTypes.GET_SUCCESS)
    })

    if (locationSuccess) {
      data = {
        ...data,
        ...locationSerializer.serialize(locationSuccess.location)
      }
    }
  }

  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(
    userApi.updateUser,
    jwt,
    data
  )
  const { data: user, error } = response
  if (user) {
    const { jwt } = user
    yield call(clientStorageService.set, constants.JWT, jwt)
    yield put({ type: userActionTypes.UPDATE_SUCCESS, user, created: false })
  } else {
    yield put({ type: userActionTypes.UPDATE_ERROR, error })
  }
}

const watchers = [
  takeLatest(userActionTypes.GET_OR_CREATE, getOrCreateUser),
  takeLatest(userActionTypes.HIDE, hideUsers),
  takeLatest(userActionTypes.SETUP, setupUser),
  takeLatest(userActionTypes.UPDATE, updateUser)
]

export { getOrCreateUser, updateUser, watchers }
