'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import lodashGet from 'lodash/get'

import * as clientStorage from '../services/clientStorage'
import * as deviceInfoService from '../services/deviceInfoService'
import * as deviceSerializers from '../services/serializers/devices'
import constants from '../constants'
import devices from '../ducks/devices'

const {
  actions: { createDevice },
  selectors: {
    device: deviceSelector,
    deviceUniqueId: deviceUniqueIdSelector,
    error: errorSelector,
    hasAcceptedEula: hasAcceptedEulaSelector,
    loading: loadingSelector
  }
} = devices

function withDevice (WrappedComponent) {
  class WrapperComponent extends Component {
    async componentDidMount () {
      const { createDevice, device } = this.props

      let storedDeviceUniqueId
      if (lodashGet(device, 'uniqueId')) {
        storedDeviceUniqueId = lodashGet(device, 'uniqueId')
      } else {
        storedDeviceUniqueId = await clientStorage.get(
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
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  const mapStateToProps = state => {
    const device = deviceSelector(state)
    const deviceError = errorSelector(state)
    const deviceLoading = loadingSelector(state)
    const deviceUniqueId = deviceUniqueIdSelector(state)
    const hasAcceptedEula = hasAcceptedEulaSelector(state)

    return {
      device,
      deviceError,
      deviceLoading,
      deviceUniqueId,
      hasAcceptedEula
    }
  }

  const mapDispatchToProps = {
    createDevice
  }

  return connect(mapStateToProps, mapDispatchToProps)(WrapperComponent)
}

export default withDevice
