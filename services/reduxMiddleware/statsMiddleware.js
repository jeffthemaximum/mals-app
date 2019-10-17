import * as statService from '../statService'

export const statsMiddleware = () => next => action => {
  const { type } = action

  const denyTypes = ['@@']

  for (const denyType of denyTypes) {
    if (type.includes(denyType)) {
      return next(action)
    }
  }

  statService.log(type, { count: 1 })

  return next(action)
}
