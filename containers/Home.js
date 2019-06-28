'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import chats from '../ducks/chats'
import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  actions: { createUser },
  selectors: {
    getUser: getUserSelector,
    loading: userLoadingSelector
  }
} = users

const {
  actions: { createChat },
  selectors: { loading: chatLoadingSelector }
} = chats

class Home extends Component {
  componentDidMount () {
    const { createUser, user } = this.props
    if (!user) {
      createUser()
    }
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
  createChat,
  createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
