import { call, put, takeLatest } from 'redux-saga/effects'

import * as chatActionTypes from './actionTypes'
import * as chatApi from './api'
import * as chatSerializers from '../../services/serializers/chats'
import * as clientStorageService from '../../services/clientStorage'
import constants from '../../constants'

function * createChat (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(chatApi.createChat, jwt)
  const { error } = response
  if (error) {
    yield put({ type: chatActionTypes.CREATE_ERROR, error })
  } else {
    yield put({ type: chatActionTypes.CREATE_SUCCESS })
  }
}

function * getChats (action) {
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(chatApi.getChats, jwt)
  const { error } = response
  if (error) {
    yield put({ type: chatActionTypes.GET_CHATS_ERROR, error })
  } else {
    const { data: chats } = response
    const deserializedChats = chats.map(chat => chatSerializers.deserialize(chat))
    yield put({ type: chatActionTypes.GET_CHATS_SUCCESS, chats: deserializedChats })
  }
}

function * reportChat (action) {
  const { chatId, content } = action
  const jwt = yield call(clientStorageService.get, constants.JWT)
  const response = yield call(chatApi.reportChat, jwt, { chatId, content })
  const { error } = response
  if (error) {
    yield put({ type: chatActionTypes.REPORT_ERROR, error })
  } else {
    yield put({ type: chatActionTypes.REPORT_SUCCESS })
  }
}

const watchers = [
  takeLatest(chatActionTypes.CREATE, createChat),
  takeLatest(chatActionTypes.GET_CHATS, getChats),
  takeLatest(chatActionTypes.REPORT, reportChat)
]

export { createChat, watchers }
