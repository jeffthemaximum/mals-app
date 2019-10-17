'use strict'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { withNavigation } from 'react-navigation'
import camelcaseKeys from 'camelcase-keys'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React, { Component } from 'react'

import constants from '../constants'
import location from '../ducks/location'
import ProfileComponent from '../components/Profile'
import users from '../ducks/users'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  actions: { pointToWords },
  selectors: { location: locationSelector, locationName: locationNameSelector }
} = location

const {
  actions: { resetAvatar, updateUser },
  selectors: { loading: loadingSelector }
} = users

class Profile extends Component {
  state = {
    dirty: false,
    errors: null,
    name: '',
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
    const {
      user: { updated_at: prevUpdatedAt }
    } = prevProps
    const {
      user: { updated_at: updatedAt }
    } = this.props

    if (prevUpdatedAt !== updatedAt) {
      this.setState({ dirty: false })
      this.handleFocus()
      showMessage({
        backgroundColor: constants.BRAND.teal,
        message: 'Successfully updated user.',
        textStyle: {
          fontFamily: constants.BASE_STYLES.fonts.regularFontFamily
        },
        type: 'default'
      })
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
    const { location, locationName, pointToWords, user } = this.props

    if (user) {
      this.setState({
        name: user.name,
        originalAvatarFile: user.avatar_file,
        originalAvatarUrl: user.avatar_url
      })
    }

    if (location && !locationName) {
      pointToWords(location)
    }
  }

  handleNameChange = inputText => {
    // Only allow alphanumeric chars in names
    if (inputText === '' || /^[a-z0-9]+$/i.test(inputText)) {
      this.setState({
        dirty: true,
        errors: null,
        name: inputText
      })
    }
  }

  setRef = ref => {
    this.ref = ref
  }

  saveProfile = () => {
    const { updateUser, user } = this.props
    const { name, originalAvatarFile, originalAvatarUrl } = this.state
    const { avatarFile, avatarUrl } = camelcaseKeys(user)

    let updateFields = { name }
    if (avatarFile !== originalAvatarFile) {
      updateFields.avatarFile = avatarFile
    }
    if (avatarUrl !== originalAvatarUrl) {
      updateFields.avatarUrl = avatarUrl
    }

    updateUser(updateFields)
    this.ref && this.ref.blur()
  }

  validateName = () => {
    const { name } = this.state

    if (name.length === 0) {
      return {
        name: [`can't be blank`]
      }
    }
  }

  render () {
    const { dirty, errors, name } = this.state
    const { loading, locationName, user } = this.props

    return (
      <ProfileComponent
        dirty={dirty}
        errors={errors}
        getNewAvatar={this.getNewAvatar}
        goBack={this.goBack}
        handleNameChange={this.handleNameChange}
        isSelf
        loading={loading}
        locationName={locationName}
        name={name}
        saveProfile={this.saveProfile}
        setRef={this.setRef}
        user={user}
      />
    )
  }
}

const mapStateToProps = state => {
  const loading = loadingSelector(state)
  const location = locationSelector(state)
  const locationName = locationNameSelector(state)

  return {
    loading,
    location,
    locationName
  }
}

const mapDispatchToProps = { pointToWords, resetAvatar, updateUser }

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
