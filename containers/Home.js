'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import lodashGet from 'lodash/get'

import * as locationSerializer from '../services/serializers/location'
import * as statService from '../services/statService'
import chats from '../ducks/chats'
import location from '../ducks/location'
import users from '../ducks/users'

import HomeComponent from '../components/Home'

const {
  selectors: { loading: chatLoadingSelector }
} = chats

const {
  actions: { setLocationError, setLocation }
} = location

const {
  actions: { createUser, updateUser },
  selectors: { getUser: getUserSelector, loading: userLoadingSelector }
} = users

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
        handleFocus()
      }
    )
  }

  componentWillUnmount () {
    this.didFocusSubscription && this.didFocusSubscription.remove()
  }

  getLocation = () => {
    const { createUser, setLocation, setLocationError } = this.props

    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation(position)
        createUser({ location: locationSerializer.serialize(position) })
      },
      error => {
        const errorCode = lodashGet(error, 'code')
        statService.log(`Home/getLocation/error/${errorCode}`, { count: 1 })
        setLocationError(error)
        createUser({})
      }
    )
  }

  handleFocus = () => {
    this.getLocation()
  }

  render () {
    return <HomeComponent {...this.props} />
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
  setLocation,
  setLocationError,
  updateUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
