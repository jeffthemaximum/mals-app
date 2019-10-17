'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import devices from '../ducks/devices'
import Splash from '../containers/Splash'
import users from '../ducks/users'

const {
  actions: { createDevice },
  selectors: {
    device: deviceSelector,
    deviceUniqueId: deviceUniqueIdSelector,
    error: deviceErrorSelector,
    hasAcceptedEula: hasAcceptedEulaSelector,
    loading: deviceLoadingSelector
  }
} = devices

const {
  actions: {
    setupUser,
    updateUser
  },
  selectors: {
    firstTimeCreatedUser: firstTimeCreatedUserSelector,
    getUser: userSelector,
    loading: userLoadingSelector
  }
} = users

function withUser (WrappedComponent) {
  class WrapperComponent extends Component {
    componentDidMount () {
      const handleFocus = this.handleFocus
      this.didFocusSubscription = this.props.navigation.addListener(
        'didFocus',
        payload => {
          handleFocus()
        }
      )
    }

    componentWillUnmount () {
      this.didFocusSubscription && this.didFocusSubscription.remove()
    }

    handleFocus = () => {
      const { device, setupUser, updateUser, user, userLoading } = this.props

      if (!user && !userLoading) {
        setupUser(device)
      }

      updateUser({ location: true })
    }

    render () {
      const { user } = this.props

      if (!user) {
        return <Splash />
      } else {
        return <WrappedComponent {...this.props} />
      }
    }
  }

  const mapStateToProps = state => {
    const device = deviceSelector(state)
    const deviceError = deviceErrorSelector(state)
    const deviceLoading = deviceLoadingSelector(state)
    const deviceUniqueId = deviceUniqueIdSelector(state)
    const firstTimeCreatedUser = firstTimeCreatedUserSelector(state)
    const hasAcceptedEula = hasAcceptedEulaSelector(state)
    const user = userSelector(state)
    const userLoading = userLoadingSelector(state)

    return {
      device,
      deviceError,
      deviceLoading,
      deviceUniqueId,
      firstTimeCreatedUser,
      hasAcceptedEula,
      user,
      userLoading
    }
  }

  const mapDispatchToProps = {
    createDevice,
    setupUser,
    updateUser
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrapperComponent)
}

export default withUser
