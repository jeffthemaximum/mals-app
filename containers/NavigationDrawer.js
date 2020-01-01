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
  actions: { blockChat },
  selectors: { chat: chatSelector, recipientName: recipientNameSelector }
} = chats

class NavigationDrawer extends Component {
  state = {
    reportChatModalIsVisible: false
  }

  handleLeave = () => {
    const { blockChat, chat, navigation, navigationName, recipientName } = this.props

    const routesToAlert = [
      constants.NAVIGATION_NAMES.chat
    ]
    const shouldAlert = routesToAlert.includes(navigationName)
    const leave = () => navigation.navigate(constants.NAVIGATION_NAMES.home)

    if (shouldAlert) {
      Alert.alert(
        'Leave chat',
        `Do you want to save your chat with ${recipientName} so you can talk again?`,
        [
          {
            text: 'Nope',
            onPress: () => {
              blockChat(chat.id)
              leave()
            }
          },
          {
            text: 'Yep',
            onPress: () => {
              leave()
            }
          }
        ]
      )
    } else {
      leave()
    }
  }

  handleReportChatCta = () => {
    this.toggleModal()
  }

  shouldRenderLeaveChat = () => {
    const { navigationName } = this.props

    const routesWhereReportingIsActive = [
      constants.NAVIGATION_NAMES.chat,
      constants.NAVIGATION_NAMES.pastChat,
      constants.NAVIGATION_NAMES.waiting
    ]

    return routesWhereReportingIsActive.includes(navigationName)
  }

  shouldRenderReportCta = () => {
    const { navigationName } = this.props

    const routesWhereReportingIsActive = [
      constants.NAVIGATION_NAMES.chat,
      constants.NAVIGATION_NAMES.pastChat
    ]

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
  const recipientName = recipientNameSelector(state)

  return {
    chat,
    recipientName
  }
}

const mapDispatchToProps = { blockChat }

const enhance = compose(
  withNavigationName(),
  withUser,
  connect(mapStateToProps, mapDispatchToProps)
)

export default hoistNonReactStatics(enhance(NavigationDrawer), NavigationDrawer)
