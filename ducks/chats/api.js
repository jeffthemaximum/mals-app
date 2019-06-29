import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'

const API_HOST = process.env['MALS_API_HOST']

export async function createChat (jwt) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'post',
    params: {},
    url: `${API_HOST}/api/v1/chats`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}

export async function sendMessage (jwt, messageData) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'post',
    params: { ...messageData },
    url: `${API_HOST}/api/v1/messages`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}
