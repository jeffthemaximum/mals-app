import lodashGet from 'lodash/get'

export const serialize = (location) => {
  return {
    latitude: lodashGet(location, 'coords.latitude'),
    longitude: lodashGet(location, 'coords.longitude')
  }
}
