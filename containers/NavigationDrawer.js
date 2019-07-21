'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'

import NavigationDrawerComponent from '../components/NavigationDrawer'

class NavigationDrawer extends Component {
  handleLeave = () => {
    const { navigation } = this.props

    Alert.alert(
      'Leave chat',
      'Are you sure? You can never get back to this chat if you leave.',
      [{
        text: 'Yep',
        onPress: () => {
          navigation.navigate('Home')
        }
      }]
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
