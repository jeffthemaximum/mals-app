import axios from 'axios'
import moment from 'moment'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'
import constants from '../../constants'

const API_ROOT = constants.API_ROOT

export async function createMessage (jwt, { message }) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'post',
    data: { ...message },
    url: `${API_ROOT}/api/v1/messages`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}

export async function getRandomMessage (jwt) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'get',
    url: `${API_ROOT}/api/v1/messages?random=true`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}

export async function readMessage (jwt, { messageId }) {
  const params = {
    delivered_at: moment.utc().toISOString()
  }
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'patch',
    params,
    url: `${API_ROOT}/api/v1/messages/${messageId}`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}
