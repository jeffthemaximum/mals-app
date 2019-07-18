import { combineReducers } from 'redux'

import chats from './chats'
import menu from './menu'
import messages from './messages'
import notifications from './notifications'
import users from './users'

const { reducer: chatsReducer } = chats
const { reducer: menuReducer } = menu
const { reducer: messagesReducer } = messages
const { reducer: notificationsReducer } = notifications
const { reducer: usersReducer } = users

const reducers = combineReducers({
  chats: chatsReducer,
  menu: menuReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  users: usersReducer
})

export default reducers
