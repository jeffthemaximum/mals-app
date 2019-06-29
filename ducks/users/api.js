import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'
import constants from '../../constants'

const API_ROOT = constants.API_ROOT

export async function createUser () {
  const requestConfig = {
    method: 'post',
    params: {},
    url: `${API_ROOT}/api/v1/users`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}

export async function updateUser (jwt, data) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'patch',
    params: data,
    url: `${API_ROOT}/api/v1/users`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}
