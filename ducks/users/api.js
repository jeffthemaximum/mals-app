import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'

const API_HOST = process.env['MALS_API_HOST']

export async function createUser () {
  const requestConfig = {
    method: 'post',
    params: {},
    url: `${API_HOST}/api/v1/users`
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
    url: `${API_HOST}/api/v1/users`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}
