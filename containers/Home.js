'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  actions: { getOrCreateUser }
} = users

class Home extends Component<{}> {
  componentDidMount () {
    const { getOrCreateUser } = this.props
    getOrCreateUser()
  }

  render () {
    return (
      <HomeComponent />
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  getOrCreateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
