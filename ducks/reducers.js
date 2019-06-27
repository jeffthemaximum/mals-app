import { combineReducers } from 'redux'

import chats from './chats'
import users from './users'

const { reducer: chatsReducer } = chats
const { reducer: usersReducer } = users

const reducers = combineReducers({
  chats: chatsReducer,
  users: usersReducer
})

export default reducers
