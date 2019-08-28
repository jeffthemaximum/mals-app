import React, { Component } from 'react'
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import { statsMiddleware } from './services/reduxMiddleware/statsMiddleware'
import Chat from './containers/Chat'
import Home from './containers/Home'
import Splash from './containers/Splash'
import NavigationDrawer from './containers/NavigationDrawer'
import NavigationService from './services/navigationService'
import reducers from './ducks/reducers'
import rootSaga from './ducks/sagas'

const sagaMiddleware = createSagaMiddleware()

const homeStackScreen = createStackNavigator(
  {
    Splash: {
      screen: Splash
    },
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: 'Splash'
  }
)

const chatStackScreen = createStackNavigator({
  Chat: {
    screen: Chat
  }
})

const MainNavigator = createDrawerNavigator(
  {
    Quit: {
      screen: homeStackScreen
    },
    Chat: {
      screen: chatStackScreen,
      navigationOptions: ({ navigation }) => {
        return {
          drawerLabel: () => null
        }
      }
    }
  },
  {
    contentComponent: function contentComponent (props) {
      return <NavigationDrawer {...props} />
    }
  }
)

const store = createStore(
  reducers,
  applyMiddleware(statsMiddleware, sagaMiddleware)
)

const Navigation = createAppContainer(MainNavigator)

sagaMiddleware.run(rootSaga)

export default class App extends Component<{}> {
  render () {
    return (
      <Provider store={store}>
        <Navigation
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </Provider>
    )
  }
}
