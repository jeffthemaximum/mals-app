'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import * as deviceSerializer from '../services/serializers/devices'
import chats from '../ducks/chats'
import constants from '../constants'
import devices from '../ducks/devices'
import location from '../ducks/location'
import users from '../ducks/users'
import withUser from './withUser'
import withNavigationName from './withNavigationName'

import HomeComponent from '../components/Home'

const {
  selectors: { loading: chatLoadingSelector }
} = chats

const {
  actions: { updateDevice }
} = devices

const {
  actions: { setLocationError, setLocation }
} = location

const {
  actions: { getOrCreateUser, updateUser },
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
    title: 'Meet a Local Stranger',
    headerTitleStyle: {
      fontFamily: 'ProximaNova-Regular'
    }
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

    return (
      <HomeComponent
        {...this.props}
        eulaModalVisibile={eulaModalVisibile}
        handleAcceptEula={this.handleAcceptEula}
      />
    )
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
  getOrCreateUser,
  setLocation,
  setLocationError,
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
