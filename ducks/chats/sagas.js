import { call, fork, put, race, take, takeLatest } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation';

import * as chatActionTypes from './actionTypes'
import * as chatApi from './api'
import * as clientStorageService from '../../services/clientStorage'
import constants from '../../constants'
import navigationService from '../../services/navigationService'
import users from '../users'

function * createChat (action) {
  const { name } = action
  yield fork(users.sagas.updateUser, { name })
  const { updateUserError } = yield race({
    updateUserError: take(users.actionTypes.UPDATE_ERROR),
    updateUserSuccess: take(users.actionTypes.UPDATE_SUCCESS)
  })
  if (updateUserError) {
    yield put({ type: chatActionTypes.CREATE_ERROR, error: updateUserError.error })
  } else {
    const jwt = yield call(clientStorageService.get, constants.JWT)
    const response = yield call(chatApi.createChat, jwt)
    const { data: chat, error } = response
    if (chat) {
      yield put({ type: chatActionTypes.CREATE_SUCCESS, chat })
      yield call(navigationService.navigate, 'Chat')
    } else {
      yield put({ type: chatActionTypes.CREATE_ERROR, error })
    }
  }
}

const watchers = [takeLatest(chatActionTypes.CREATE, createChat)]

export { createChat, watchers }
