import { all } from 'redux-saga/effects'

import chats from './chats'
import users from './users'

export default function * root () {
  yield all([
    ...chats.sagas.watchers,
    ...users.sagas.watchers
  ])
}