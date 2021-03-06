'use strict'

import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import lodashGet from 'lodash/get'

import Button from './Button'
import constants from '../constants'
import EulaModal from './EulaModal'
import FriendlyEncounter from './FriendlyEncounter'
import LoadingSpinner from './LoadingSpinner'
import NameInputField from './NameInputField'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: null,
      name: ''
    }
  }

  componentDidMount () {
    const handleFocus = this.handleFocus
    handleFocus()
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.error && this.props.error) {
      this.setState({ errors: this.props.error })
    }
  }

  handleBlur = () => {
    this.setState({
      errors: null,
      name: ''
    })
  }

  handleFocus = () => {
    const { user } = this.props

    this.setState({ name: lodashGet(user, 'name', '') })
  }

  onFormSubmit = () => {
    const { updateUser } = this.props

    const errors = this.validateName()

    if (errors) {
      this.setState({ errors })
    } else {
      const { name } = this.state
      updateUser({ name })
    }
  }

  onNameChange = inputText => {
    // Only allow alphanumeric chars in names
    if (inputText === '' || /^[a-z0-9]+$/i.test(inputText)) {
      this.setState({
        errors: null,
        name: inputText
      })
    }
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
    const { eulaModalVisibile, deviceLoading, handleAcceptEula, loading } = this.props
    const { errors, name } = this.state

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0

    return (
      <KeyboardAvoidingView
        behavior='position'
        enabled
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
        <EulaModal
          loading={deviceLoading}
          isVisible={eulaModalVisibile}
          handlePress={handleAcceptEula}
        />
        <NavigationEvents onDidBlur={payload => this.handleBlur()} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          <FriendlyEncounter />
          <Text style={styles.description}>
            <Text style={styles.bold}>Hello </Text>
            <Text>Stranger</Text>
          </Text>
          {!loading ? (
            <NameInputField
              containerStyles={{
                width: '100%'
              }}
              errors={errors}
              fontSize={24}
              label={'Enter first name...'}
              name={name}
              onChange={this.onNameChange}
            />
          ) : (
            <LoadingSpinner />
          )}
        </ScrollView>
        <Button
          handlePress={this.onFormSubmit}
          isLoading={loading}
          text={`Let's go`}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: constants.BASE_STYLES.container,
  buttonStyles: {
    backgroundColor: constants.BRAND.navy
  },
  buttonText: {
    color: constants.BRAND.white,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 18
  },
  bold: {
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 36,
    marginBottom: 48,
    marginTop: 24,
    textAlign: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  footer: {
    alignSelf: 'flex-end'
  },
  scrollView: {
    width: '100%'
  }
})
