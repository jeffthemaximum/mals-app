'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import * as deviceSerializer from '../services/serializers/devices'
import chats from '../ducks/chats'
import constants from '../constants'
import devices from '../ducks/devices'
import HomeComponent from '../components/Home'
import HomeFirstTimeComponent from '../components/HomeFirstTime'
import location from '../ducks/location'
import users from '../ducks/users'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  selectors: { loading: chatLoadingSelector }
} = chats

const {
  actions: { updateDevice }
} = devices


const {
  actions: { updateUser },
  selectors: {
    error: errorSelector,
    loading: userLoadingSelector
  }
} = users

class Home extends Component {
  state = {
    eulaModalVisibile: false
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount () {
    const { deviceUniqueId, hasAcceptedEula } = this.props

    if (deviceUniqueId && !hasAcceptedEula) {
      this.setState({ eulaModalVisibile: true })
    }
  }

  handleAcceptEula = () => {
    const { deviceUniqueId, updateDevice } = this.props

    const serializedData = deviceSerializer.serialize({ hasAcceptedEula: true })

    updateDevice(deviceUniqueId, serializedData)
    this.setState({ eulaModalVisibile: false })
  }

  render () {
    const { eulaModalVisibile } = this.state
    const { firstTimeCreatedUser } = this.props

    if (firstTimeCreatedUser) {
      return (
        <HomeFirstTimeComponent
          {...this.props}
          eulaModalVisibile={eulaModalVisibile}
          handleAcceptEula={this.handleAcceptEula}
        />
      )
    } else {
      return (
        <HomeComponent
          {...this.props}
          eulaModalVisibile={eulaModalVisibile}
          handleAcceptEula={this.handleAcceptEula}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  const error = errorSelector(state)
  const loading = userLoadingSelector(state) || chatLoadingSelector(state)

  return {
    error,
    loading
  }
}

const mapDispatchToProps = {
  updateDevice,
  updateUser
}

const enhance = compose(
  withUser,
  withNavigationName(constants.NAVIGATION_NAMES.home),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(Home), Home)
