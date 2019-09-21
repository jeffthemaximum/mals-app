import { call, put, takeLatest } from 'redux-saga/effects'

import * as locationActionTypes from './actionTypes'
import locationService from '../../services/locationService'

function * getLocation (action) {
  try {
    const location = yield call(locationService.getUserLocation)
    yield put({ type: locationActionTypes.GET_SUCCESS, location })
  } catch (e) {
    yield put({ type: locationActionTypes.GET_ERROR })
  }
}

const watchers = [takeLatest(locationActionTypes.GET, getLocation)]

export { getLocation, watchers }
