import axios from 'axios'

import { handleApiError } from '../../services/errorHandler'

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
