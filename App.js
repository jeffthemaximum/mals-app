/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

import Home from './containers/Home'
import reducers from './ducks/reducers'

const MainNavigator = createStackNavigator({
  Home: { screen: Home }
})

const Navigation = createAppContainer(MainNavigator)

const store = createStore(reducers)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
