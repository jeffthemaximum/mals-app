'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  actions: { createUser },
  selectors: { getUser: getUserSelector }
} = users

class Home extends Component<{}> {
  componentDidMount () {
    const { createUser } = this.props
    createUser()
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
  createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
