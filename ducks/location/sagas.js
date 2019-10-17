import { call, put, takeLatest } from 'redux-saga/effects'

import * as locationActionTypes from './actionTypes'
import * as reverseGeocodingService from '../../services/reverseGeocodingService'
import locationService from '../../services/locationService'

function * getLocation (action) {
  try {
    const location = yield call(locationService.getUserLocation)
    yield put({ type: locationActionTypes.GET_SUCCESS, location })
  } catch (e) {
    yield put({ type: locationActionTypes.GET_ERROR })
  }
}

function * pointToWords (action) {
  const { data } = action
  const response = yield call(reverseGeocodingService.pointToWords, data)
  const { name, error } = response
  if (name) {
    yield put({ type: locationActionTypes.POINT_TO_WORDS_SUCCESS, name })
  } else {
    yield put({ type: locationActionTypes.POINT_TO_WORDS_ERROR, error })
  }
}

function * recipientPointToWords (action) {
  const { data } = action
  const response = yield call(reverseGeocodingService.pointToWords, data)
  const { name, error } = response
  if (name) {
    yield put({ type: locationActionTypes.RECIPIENT_POINT_TO_WORDS_SUCCESS, name, recipient: action.data.recipient })
  } else {
    yield put({ type: locationActionTypes.RECIPIENT_POINT_TO_WORDS_ERROR, error })
  }
}

const watchers = [
  takeLatest(locationActionTypes.GET, getLocation),
  takeLatest(locationActionTypes.POINT_TO_WORDS, pointToWords),
  takeLatest(locationActionTypes.RECIPIENT_POINT_TO_WORDS, recipientPointToWords)
]

export { getLocation, watchers }
