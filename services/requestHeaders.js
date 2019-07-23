export const generateHeaders = ({ jwt }) => {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (jwt) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${jwt}`
    }
  }

  return headers
}
