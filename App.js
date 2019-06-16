/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './components/Home'

const MainNavigator = createStackNavigator({
  Home: { screen: Home }
})

const App = createAppContainer(MainNavigator)
export default App
