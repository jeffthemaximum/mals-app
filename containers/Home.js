'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  actions: { createUser },
  selectors: {
    getUser: getUserSelector,
    loading: loadingSelector
  }
} = users

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
  const user = getUserSelector(state)
  const loading = loadingSelector(state)

  return {
    loading,
    user
  }
}

const mapDispatchToProps = {
  createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
