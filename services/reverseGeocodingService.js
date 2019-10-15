import axios from 'axios'
import lodashGet from 'lodash/get'

import { config } from '../config'
import * as locationSerializer from './serializers/location'
import * as statService from './statService'

const BingMapsAPIKey = config.BING_API_KEY

export async function pointToWords (data) {
  const latitude = lodashGet(data, 'coords.latitude')
  const longitude = lodashGet(data, 'coords.longitude')

  const url = `http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${BingMapsAPIKey}`

  const requestConfig = {
    method: 'get',
    url
  }

  try {
    const response = await axios.request(requestConfig)
    const name = locationSerializer.deserializeReverseGeocoding(response.data)
    statService.log('reverseGeocodingService.pointToWords.success', { count: 1 })
    return { name }
  } catch (e) {
    console.log(e.message)
    statService.log('reverseGeocodingService.pointToWords.error', { count: 1 })
    return { error: 'reverseGeocodingService.pointToWords error' }
  }
}
