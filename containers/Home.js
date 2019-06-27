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
    loading: loadingSelector
  }
} = users

const {
  actions: { createChat }
} = chats

class Home extends Component<{}> {
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
  const loading = loadingSelector(state)
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
