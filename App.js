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
import createSagaMiddleware from 'redux-saga'

import Chat from './containers/Chat'
import Home from './containers/Home'
import NavigationService from './services/navigationService'
import reducers from './ducks/reducers'
import rootSaga from './ducks/sagas'

const sagaMiddleware = createSagaMiddleware()

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Chat: { screen: Chat}
})

const store = createStore(
  reducers,
  applyMiddleware(
    sagaMiddleware
  )
)

const Navigation = createAppContainer(MainNavigator)

sagaMiddleware.run(rootSaga)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Navigation ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}/>
      </Provider>
    );
  }
}
