'use strict'

import { connect } from 'react-redux'
import React, { Component } from 'react'

import chats from '../ducks/chats'
import HeaderComponent from '../components/Header'

const {
  selectors: { recipient: recipientSelector }
} = chats

class Header extends Component {
  handlePress = e => {
    const { navigation } = this.props

    navigation.openDrawer()
  }

  render () {
    const { recipient } = this.props

    return <HeaderComponent handlePress={this.handlePress} recipient={recipient} />
  }
}

const mapStateToProps = state => {
  const recipient = recipientSelector(state)

  return {
    recipient
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
