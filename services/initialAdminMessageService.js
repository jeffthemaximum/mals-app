import lodashGet from 'lodash/get'

export const isInitialAdminMessage = (message) => (
  lodashGet(message, 'user.isAdmin') === true &&
  lodashGet(message, 'text') &&
  lodashGet(message, 'text').startsWith('You\'re chatting with a user who\'s')
)
