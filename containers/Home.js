'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import lodashGet from 'lodash/get'
import React, { Component } from 'react'

import * as deviceSerializer from '../services/serializers/devices'
import * as locationSerializer from '../services/serializers/location'
import * as statService from '../services/statService'
import chats from '../ducks/chats'
import devices from '../ducks/devices'
import location from '../ducks/location'
import users from '../ducks/users'
import withDevice from './withDevice'

import HomeComponent from '../components/Home'

const {
  selectors: { loading: chatLoadingSelector }
} = chats

const {
  actions: { updateDevice },
  selectors: {
    deviceUniqueId: deviceUniqueIdSelector,
    hasAcceptedEula: hasAcceptedEulaSelector,
    loading: deviceLoadingSelector
  }
} = devices

const {
  actions: { setLocationError, setLocation }
} = location

const {
  actions: { createUser, updateUser },
  selectors: {
    error: errorSelector,
    getUser: getUserSelector,
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

    const handleFocus = this.handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )

    if (deviceUniqueId && !hasAcceptedEula) {
      this.setState({ eulaModalVisibile: true })
    }
  }

  componentWillUnmount () {
    this.didFocusSubscription && this.didFocusSubscription.remove()
  }

  getLocation = () => {
    const { createUser, setLocation, setLocationError } = this.props

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation(position)
        createUser({ location: locationSerializer.serialize(position) })
      },
      error => {
        const errorCode = lodashGet(error, 'code')
        statService.log(`Home/getLocation/error/${errorCode}`, { count: 1 })
        setLocationError(error)
        createUser({})
      }
    )
  }

  handleAcceptEula = () => {
    const { deviceUniqueId, updateDevice } = this.props

    const serializedData = deviceSerializer.serialize({ hasAcceptedEula: true })

    updateDevice(deviceUniqueId, serializedData)
    this.setState({ eulaModalVisibile: false })
  }

  handleFocus = () => {
    this.getLocation()
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
  const deviceLoading = deviceLoadingSelector(state)
  const deviceUniqueId = deviceUniqueIdSelector(state)
  const error = errorSelector(state)
  const hasAcceptedEula = hasAcceptedEulaSelector(state)
  const loading = userLoadingSelector(state) || chatLoadingSelector(state)
  const user = getUserSelector(state)

  return {
    deviceLoading,
    deviceUniqueId,
    error,
    hasAcceptedEula,
    loading,
    user
  }
}

const mapDispatchToProps = {
  createUser,
  setLocation,
  setLocationError,
  updateDevice,
  updateUser
}

const enhance = compose(
  withDevice,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(Home), Home)
