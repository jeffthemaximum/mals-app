import camelCaseKeys from 'camelcase-keys'
import snakeCaseKeys from 'snakecase-keys'

export const deserialize = data => camelCaseKeys(data)

export const serialize = data => snakeCaseKeys(data)
