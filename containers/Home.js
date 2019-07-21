'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import chats from '../ducks/chats'
import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  actions: { createUser, updateUser },
  selectors: {
    getUser: getUserSelector,
    loading: userLoadingSelector
  }
} = users

const {
  selectors: { loading: chatLoadingSelector }
} = chats

class Home extends Component {
  static navigationOptions = {
    title: 'Meet a Local Stranger',
    headerTitleStyle: {
      fontFamily: 'ProximaNova-Regular'
    }
  }

  componentDidMount () {
    const handleFocus = this.handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        console.log('focus', payload)
        handleFocus()
      }
    )
  }

  handleFocus = () => {
    const { createUser, user } = this.props
    console.log({ user })
    createUser()
  }

  render () {
    return (
      <HomeComponent {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  const loading = userLoadingSelector(state) || chatLoadingSelector(state)
  const user = getUserSelector(state)

  return {
    loading,
    user
  }
}

const mapDispatchToProps = {
  createUser,
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
