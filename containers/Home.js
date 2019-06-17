'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  actions: { getOrCreateUser },
  selectors: { getUser: getUserSelector }
} = users

class Home extends Component<{}> {
  componentDidMount () {
    const { getOrCreateUser } = this.props
    getOrCreateUser()
  }

  render () {
    return (
      <HomeComponent {...this.props} />
    )
  }
}

const mapStateToProps = state => {
  const user = getUserSelector(state)
  const loading = !user

  return {
    loading,
    user
  }
}

const mapDispatchToProps = {
  getOrCreateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
