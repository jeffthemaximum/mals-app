import lodashGet from 'lodash/get'
import users from '../users'

const {
  selectors: { getUser: getUserSelector }
} = users

export const chat = state => state.chats.chat
export const chatDistance = state => lodashGet(chat(state), 'distance')
export const chatId = state => lodashGet(chat(state), 'id')
export const chats = state => state.chats.chats
export const chatStatus = state => state.chats.status
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
export const recipientName = state => lodashGet(recipient(state), 'name')
export const reportError = state => !!state.chats.reportError
export const reportLoading = state => !!state.chats.reportLoading
export const reportSuccess = state => !!state.chats.reportSuccess
