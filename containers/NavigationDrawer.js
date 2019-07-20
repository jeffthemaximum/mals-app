'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'

import NavigationDrawerComponent from '../components/NavigationDrawer'

class NavigationDrawer extends Component {
  handleLeave = () => {
    Alert.alert(
      'Leave chat',
      'Are you sure? You can never get back to this chat if you leave.',
      [{ text: 'YES', onPress: () => console.log('hi') }]
    )
  }

  render () {
    return (
      <NavigationDrawerComponent
        handleLeave={this.handleLeave}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationDrawer)
