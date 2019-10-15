import lodashGet from 'lodash/get'

export const deserializeReverseGeocoding = (data) => {
  const adminDistrict = lodashGet(data, 'resourceSets.0.resources.0.address.adminDistrict')
  const adminDistrict2 = lodashGet(data, 'resourceSets.0.resources.0.address.adminDistrict2')
  const postalCode = lodashGet(data, 'resourceSets.0.resources.0.address.postalCode')

  const dataArray = []

  if (adminDistrict2) dataArray.push(adminDistrict2)
  if (adminDistrict) dataArray.push(adminDistrict)
  if (postalCode) dataArray.push(postalCode)

  if (data.length === 0) {
    throw new Error('geocoding missing any data')
  }

  if (dataArray.length === 3) {
    return `${dataArray[0]} ${dataArray[1]}, ${dataArray[2]}`
  } else {
    return dataArray.join(' ')
  }
}

export const serialize = (location) => {
  return {
    latitude: lodashGet(location, 'coords.latitude'),
    longitude: lodashGet(location, 'coords.longitude')
  }
}
