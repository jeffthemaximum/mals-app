'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import camelcaseKeys from 'camelcase-keys'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import constants from '../constants'
import ProfileComponent from '../components/Profile'
import users from '../ducks/users'
import { withNavigation } from 'react-navigation'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  actions: { resetAvatar, updateUser },
  selectors: { loading: loadingSelector }
} = users

class Profile extends Component {
  state = {
    dirty: false,
    originalAvatarFile: null,
    originalAvatarUrl: null
  }

  componentDidMount () {
    const handleFocus = this.handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )

    const handleBlur = this.handleBlur
    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        handleBlur()
      }
    )
  }

  componentDidUpdate (prevProps) {
    const { user: { updated_at: prevUpdatedAt } } = prevProps
    const { user: { updated_at: updatedAt } } = this.props

    if (prevUpdatedAt !== updatedAt) {
      this.setState({ dirty: false })
      this.handleFocus()
    }
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  getNewAvatar = () => {
    const { updateUser } = this.props
    updateUser({ avatar: true })
    this.setState({ dirty: true })
  }

  handleBlur = () => {
    const { dirty, originalAvatarFile, originalAvatarUrl } = this.state
    const { resetAvatar, user } = this.props

    if (dirty && (originalAvatarFile || originalAvatarUrl)) {
      resetAvatar({
        file: originalAvatarFile,
        url: originalAvatarUrl,
        user
      })
    }
  }

  handleFocus = () => {
    const { user } = this.props

    if (user) {
      this.setState({
        originalAvatarFile: user.avatar_file,
        originalAvatarUrl: user.avatar_url
      })
    }
  }

  saveProfile = () => {
    const { updateUser, user } = this.props
    const { originalAvatarFile, originalAvatarUrl } = this.state
    const { avatarFile, avatarUrl } = camelcaseKeys(user)

    let updateFields = {}
    if (avatarFile !== originalAvatarFile) {
      updateFields.avatarFile = avatarFile
    }
    if (avatarUrl !== originalAvatarUrl) {
      updateFields.avatarUrl = avatarUrl
    }

    updateUser(updateFields)
  }

  render () {
    const { dirty } = this.state
    const { loading, user } = this.props

    return (
      <ProfileComponent
        dirty={dirty}
        getNewAvatar={this.getNewAvatar}
        goBack={this.goBack}
        loading={loading}
        saveProfile={this.saveProfile}
        user={user}
      />
    )
  }
}

const mapStateToProps = state => {
  const loading = loadingSelector(state)
  return { loading }
}

const mapDispatchToProps = { resetAvatar, updateUser }

const enhance = compose(
  withUser,
  withNavigationName(constants.NAVIGATION_NAMES.profile),
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default hoistNonReactStatics(enhance(Profile), Profile)
