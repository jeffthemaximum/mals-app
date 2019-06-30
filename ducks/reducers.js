import { combineReducers } from 'redux'

import chats from './chats'
import messages from './messages'
import users from './users'

const { reducer: chatsReducer } = chats
const { reducer: messagesReducer } = messages
const { reducer: usersReducer } = users

const reducers = combineReducers({
  chats: chatsReducer,
  messages: messagesReducer,
  users: usersReducer
})

export default reducers
