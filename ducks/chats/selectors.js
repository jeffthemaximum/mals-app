import lodashGet from 'lodash/get'
import users from '../users'

const {
  selectors: { getUser: getUserSelector }
} = users

export const chat = state => state.chats.chat
export const chatId = state => lodashGet(chat(state), 'id')
export const error = state => state.chats.error
export const loading = state => !!state.chats.loading
export const recipient = state => {
  const storedChat = chat(state)
  if (storedChat) {
    const user = getUserSelector(state)
    if (user) {
      const selfId = user.id
      return storedChat.users.find(user => user.id !== selfId)
    }
  }
}
export const reportError = state => !!state.chats.reportError
export const reportLoading = state => !!state.chats.reportLoading
export const reportSuccess = state => !!state.chats.reportSuccess
