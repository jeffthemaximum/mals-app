import { config } from '../../config'

export const API_ROOT = config.API_HOST

export const API_WS_ROOT = `${API_ROOT}/cable`

export const ENV_NAME = config.ENV_NAME
