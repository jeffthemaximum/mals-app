'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as clientStorage from '../services/clientStorage'
import * as deviceInfoService from '../services/deviceInfoService'
import * as deviceSerializers from '../services/serializers/devices'
import constants from '../constants'
import devices from '../ducks/devices'
import SplashComponent from '../components/Splash'

const {
  actions: { createDevice },
  selectors: {
    device: deviceSelector,
    error: errorSelector,
    loading: loadingSelector
  }
} = devices

class Splash extends Component {
  state = { intervalId: null }

  async componentDidMount () {
    const handleBlur = this.handleBlur
    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        handleBlur()
      }
    )

    const { createDevice } = this.props

    let storedDeviceUniqueId = await clientStorage.get(
      constants.DEVICE_UNIQUE_ID
    )

    let deviceInfo
    if (storedDeviceUniqueId) {
      deviceInfo = { uniqueId: storedDeviceUniqueId }
    } else {
      deviceInfo = deviceInfoService.getInfo()
    }

    const serializedData = deviceSerializers.serialize(deviceInfo)
    createDevice(serializedData)
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.device && this.props.device) {
      this.moveOn()
    }
  }

  componentWillUnmount () {
    this.handleBlur()
    this.didBlurSubscription && this.didBlurSubscription.remove()
    this.didFocusSubscription && this.didFocusSubscription.remove()
  }

  handleBlur = () => {
    const { intervalId } = this.state

    if (intervalId) {
      clearInterval(intervalId)
      this.setState({ intervalId: null })
    }
  }

  handleFocus = () => {
    let { intervalId } = this.state

    if (!intervalId) {
      const intervalId = setInterval(this.moveOn, 5000)
      this.setState({ intervalId })
    }
  }

  moveOn = () => {
    const { navigation } = this.props

    navigation.navigate('Home')
  }

  render () {
    return <SplashComponent />
  }
}

const mapStateToProps = state => {
  const device = deviceSelector(state)
  const error = errorSelector(state)
  const loading = loadingSelector(state)

  return {
    device,
    error,
    loading
  }
}

const mapDispatchToProps = {
  createDevice
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash)
