export const generateHeaders = ({jwt}) => {
  let headers = {}

  if (jwt) {
    headers = {
      ...headers,
      'Authorization': `Bearer ${jwt}`
    }
  }

  return headers
}
