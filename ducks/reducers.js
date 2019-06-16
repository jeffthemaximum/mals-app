import { combineReducers } from 'redux'

import users from './users'

const { reducer: usersReducer } = users

const reducers = combineReducers({
  users: usersReducer
})

export default reducers
