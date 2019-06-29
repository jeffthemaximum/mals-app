export const generateHeaders = ({ jwt }) => {
  let headers = {}

  if (jwt) {
    headers = {
      ...headers,
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    }
  }

  return headers
}
