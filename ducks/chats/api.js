import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'
import constants from '../../constants'

const API_ROOT = constants.API_ROOT

export async function createChat (jwt) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'post',
    data: {},
    url: `${API_ROOT}/api/v1/chats`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}
