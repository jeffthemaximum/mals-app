'use strict'

import { Alert } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import chats from '../ducks/chats'
import constants from '../constants'
import NavigationDrawerComponent from '../components/NavigationDrawer'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  selectors: { chat: chatSelector }
} = chats

class NavigationDrawer extends Component {
  state = {
    reportChatModalIsVisible: false
  }

  handleLeave = () => {
    const { navigation } = this.props

    Alert.alert(
      'Leave chat',
      'Are you sure? You can never get back to this chat if you leave.',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Yep',
          onPress: () => {
            navigation.navigate(constants.NAVIGATION_NAMES.home)
          }
        }
      ]
    )
  }

  handleReportChatCta = () => {
    this.toggleModal()
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

    const routesWhereReportingIsActive = [constants.NAVIGATION_NAMES.chat]

    return routesWhereReportingIsActive.includes(navigationName)
  }

  toggleModal = () => {
    const { reportChatModalIsVisible } = this.state

    this.setState({ reportChatModalIsVisible: !reportChatModalIsVisible })
  }

  render () {
    const { reportChatModalIsVisible } = this.state

    return (
      <NavigationDrawerComponent
        handleLeave={this.handleLeave}
        handleReportChatCta={this.handleReportChatCta}
        reportChatModalIsVisible={reportChatModalIsVisible}
        shouldRenderLeaveChat={this.shouldRenderLeaveChat()}
        shouldRenderReportCta={this.shouldRenderReportCta()}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  const chat = chatSelector(state)

  return {
    chat
  }
}

const mapDispatchToProps = {}

const enhance = compose(
  withNavigationName(),
  withUser,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(NavigationDrawer), NavigationDrawer)
