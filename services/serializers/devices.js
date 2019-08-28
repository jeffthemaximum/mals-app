import snakeCaseKeys from 'snakecase-keys'

export const serialize = data => snakeCaseKeys(data)
