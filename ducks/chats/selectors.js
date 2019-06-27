import users from '../users'

const { selectors: { getUser: getUserSelector } } = users

export const chat = (state) => state.chats.chat
export const error = (state) => state.chats.error
export const loading = (state) => !!state.chats.loading
export const recipient = (state) => {
  const selfId = getUserSelector(state).id
  return chat(state).users.find(user => user.id !== selfId)
}
