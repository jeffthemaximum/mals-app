import { all } from 'redux-saga/effects'

import chats from './chats'
import messages from './messages'
import users from './users'

export default function * root () {
  yield all([
    ...chats.sagas.watchers,
    ...messages.sagas.watchers,
    ...users.sagas.watchers
  ])
}
