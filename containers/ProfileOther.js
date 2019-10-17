'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import hoistNonReactStatics from 'hoist-non-react-statics'
import lodashGet from 'lodash/get'
import React, { Component } from 'react'

import chats from '../ducks/chats'
import constants from '../constants'
import location from '../ducks/location'
import ProfileComponent from '../components/Profile'
import users from '../ducks/users'
import withNavigationName from './withNavigationName'

const {
  actions: {
    setChatStatus
  },
  selectors: {
    recipient: recipientSelector,
    recipientName: recipientNameSelector
  }
} = chats

const {
  actions: { recipientPointToWords }
} = location

const {
  actions: { hideUsers }
} = users

class ProfileOther extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount () {
    const handleFocus = this.handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )
  }

  denyRequest = () => {
    const { hideUsers, navigation, recipient, setChatStatus } = this.props

    const recipientId = lodashGet(recipient, 'id')
    if (recipientId) {
      hideUsers(recipientId)
    }

    setChatStatus(null)
    navigation.navigate(constants.NAVIGATION_NAMES.home)
  }

  handleFocus = () => {
    const { recipient, recipientPointToWords } = this.props

    const latitude = lodashGet(recipient, 'latitude')
    const longitude = lodashGet(recipient, 'longitude')

    if (latitude && longitude) {
      recipientPointToWords({ coords: { latitude, longitude }, recipient })
    }
  }

  startChat = () => {
    const { navigation, setChatStatus } = this.props
    setChatStatus(constants.RANDOM_CHAT_STATES.started)
    navigation.navigate(constants.NAVIGATION_NAMES.chat)
  }

  render () {
    const { locationName, recipient, recipientName } = this.props

    return (
      <ProfileComponent
        denyRequest={this.denyRequest}
        isSelf={false}
        locationName={locationName}
        name={recipientName}
        startChat={this.startChat}
        user={recipient}
      />
    )
  }
}

const mapStateToProps = state => {
  const recipient = recipientSelector(state)
  const recipientName = recipientNameSelector(state)

  const locationName = recipient && recipient.locationName

  return { locationName, recipient, recipientName, setChatStatus }
}

const mapDispatchToProps = { hideUsers, recipientPointToWords, setChatStatus }

const enhance = compose(
  withNavigationName(constants.NAVIGATION_NAMES.profileOther),
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(ProfileOther), ProfileOther)
