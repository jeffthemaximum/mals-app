'use strict'

import { Alert } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import chats from '../ducks/chats'
import constants from '../constants'
import NavigationDrawerComponent from '../components/NavigationDrawer'
import users from '../ducks/users'
import withNavigationName from './withNavigationName'

const {
  selectors: { chat: chatSelector }
} = chats

const {
  selectors: { getUser }
} = users

class NavigationDrawer extends Component {
  handleLeave = () => {
    const { navigation } = this.props

    Alert.alert(
      'Leave chat',
      'Are you sure? You can never get back to this chat if you leave.',
      [
        {
          text: 'Yep',
          onPress: () => {
            navigation.navigate(constants.NAVIGATION_NAMES.home)
          }
        }
      ]
    )
  }

  shouldRenderLeaveChat = () => {
    const { navigationName } = this.props

    const routesWhereReportingIsActive = [
      constants.NAVIGATION_NAMES.chat,
      constants.NAVIGATION_NAMES.waiting
    ]

    return routesWhereReportingIsActive.includes(navigationName)
  }

  shouldRenderReportCta = () => {
    const { navigationName } = this.props

    const routesWhereReportingIsActive = [
      constants.NAVIGATION_NAMES.chat
    ]

    console.log({ navigationName })

    return routesWhereReportingIsActive.includes(navigationName)
  }

  render () {
    return (
      <NavigationDrawerComponent
        handleLeave={this.handleLeave}
        shouldRenderLeaveChat={this.shouldRenderLeaveChat()}
        shouldRenderReportCta={this.shouldRenderReportCta()}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  const chat = chatSelector(state)
  const user = getUser(state)

  return {
    chat,
    user
  }
}

const mapDispatchToProps = {}

const enhance = compose(
  withNavigationName(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(NavigationDrawer), NavigationDrawer)
