/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { Client } from 'bugsnag-react-native'
import { config } from './config'
import { Buffer } from 'buffer'

const bugsnag = new Client(config.BUGSNAG_API_KEY)
bugsnag.notify(new Error('Test error'))

global.Buffer = Buffer // needed for is-svg' npm package

AppRegistry.registerComponent(appName, () => App)

export default {
  bugsnag
}
