'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import constants from '../constants'
import SplashComponent from '../components/Splash'
import withNavigationName from './withNavigationName'

class Splash extends Component {
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(Splash), Splash)
