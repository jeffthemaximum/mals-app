export const error = state => state.users.error
export const firstTimeCreatedUser = state => state.users.created
export const getUser = state => state.users.user
export const loading = state => state.users.loading
export const userChatsCount = (state) => {
  const user = getUser(state)
  if (user) {
    return user.chats_count
  } else {
    return 0
  }
}
