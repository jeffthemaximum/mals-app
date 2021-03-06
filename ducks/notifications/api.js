import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'
import constants from '../../constants'

const API_ROOT = constants.API_ROOT

export async function createNotification (jwt, { notification }) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'post',
    data: { ...notification },
    url: `${API_ROOT}/api/v1/notifications`
  }

  try {
    const response = await axios.request(requestConfig)
    return response
  } catch (e) {
    const errors = handleApiError(e)
    return { error: errors }
  }
}
