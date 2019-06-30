import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'
import { generateHeaders } from '../../services/requestHeaders'
import constants from '../../constants'

const API_ROOT = constants.API_ROOT

export async function createMessage (jwt, { message }) {
  const requestConfig = {
    headers: generateHeaders({ jwt }),
    method: 'post',
    params: { ...message },
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
