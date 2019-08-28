import { combineReducers } from 'redux'

import chats from './chats'
import devices from './devices'
import location from './location'
import messages from './messages'
import notifications from './notifications'
import users from './users'

const { reducer: chatsReducer } = chats
const { reducer: devicesReducer } = devices
const { reducer: locationReducer } = location
const { reducer: messagesReducer } = messages
const { reducer: notificationsReducer } = notifications
const { reducer: usersReducer } = users

const reducers = combineReducers({
  chats: chatsReducer,
  devices: devicesReducer,
  location: locationReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  users: usersReducer
})

export default reducers
