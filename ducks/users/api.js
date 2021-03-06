import axios from 'axios'
import lodashGet from 'lodash/get'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'
import constants from '../../constants'

const API_ROOT = constants.API_ROOT

export async function createUser (data) {
  const requestConfig = {
    headers: generateHeaders({}),
    method: 'post',
    data,
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

export async function fetchUser (jwt) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'get',
    url: `${API_ROOT}/api/v1/users`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors, status: lodashGet(e, 'response.status') }
  }
}

export async function hideUsers (jwt, recipientId) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'patch',
    url: `${API_ROOT}/api/v1/users/${recipientId}/hide`
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
    data: data,
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
