/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { Client } from 'bugsnag-react-native'
import { config } from './config'

const bugsnag = new Client(config.BUGSNAG_API_KEY)
bugsnag.notify(new Error('Test error'))

AppRegistry.registerComponent(appName, () => App)

export default {
  bugsnag
}
