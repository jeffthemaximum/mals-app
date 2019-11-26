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
import constants from './constants'
import FlashMessage from 'react-native-flash-message'
import Home from './containers/Home'
import Messages from './containers/Messages'
import NavigationDrawer from './containers/NavigationDrawer'
import NavigationService from './services/navigationService'
import Profile from './containers/Profile'
import ProfileOther from './containers/ProfileOther'
import reducers from './ducks/reducers'
import rootSaga from './ducks/sagas'

const sagaMiddleware = createSagaMiddleware()

const homeStackScreen = createStackNavigator({
  [constants.NAVIGATION_NAMES.home]: {
    screen: Home
  },
  [constants.NAVIGATION_NAMES.messages]: {
    screen: Messages
  },
  [constants.NAVIGATION_NAMES.profile]: {
    screen: Profile
  },
  [constants.NAVIGATION_NAMES.profileOther]: {
    screen: ProfileOther
  }
})

const chatStackScreen = createStackNavigator({
  [constants.NAVIGATION_NAMES.chat]: {
    screen: Chat
  }
})

const MainNavigator = createDrawerNavigator(
  {
    [constants.NAVIGATION_NAMES.quit]: {
      screen: homeStackScreen,
      navigationOptions: ({ navigation }) => ({
        drawerLockMode: 'locked-closed'
      })
    },
    [constants.NAVIGATION_NAMES.chat]: {
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
        <FlashMessage position='top' />
      </Provider>
    )
  }
}
