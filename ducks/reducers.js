import { combineReducers } from 'redux'

import chats from './chats'
import messages from './messages'
import notifications from './notifications'
import users from './users'

const { reducer: chatsReducer } = chats
const { reducer: messagesReducer } = messages
const { reducer: notificationsReducer } = notifications
const { reducer: usersReducer } = users

const reducers = combineReducers({
  chats: chatsReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  users: usersReducer
})

export default reducers
