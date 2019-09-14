'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import constants from '../constants'
import SplashComponent from '../components/Splash'
import withDevice from './withDevice'
import withNavigationName from './withNavigationName'

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

    const { intervalId } = this.state

    if (!intervalId) {
      const intervalId = setInterval(this.moveOn, 5000)
      this.setState({ intervalId })
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.device && this.props.device) {
      this.moveOn()
    }
  }

  componentWillUnmount () {
    this.handleBlur()
    this.didBlurSubscription && this.didBlurSubscription.remove()
  }

  handleBlur = () => {
    const { intervalId } = this.state

    if (intervalId) {
      clearInterval(intervalId)
      this.setState({ intervalId: null })
    }
  }

  moveOn = () => {
    const { navigation } = this.props

    navigation.replace(constants.NAVIGATION_NAMES.home)
  }

  render () {
    return <SplashComponent />
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {}

const enhance = compose(
  withNavigationName(constants.NAVIGATION_NAMES.splash),
  withDevice,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(Splash), Splash)
