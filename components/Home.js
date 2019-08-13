'use strict'

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import lodashGet from 'lodash/get'
import { NavigationEvents } from 'react-navigation'

import Button from './Button'
import constants from '../constants'

const NameInputField = ({ errors, name, onChange }) => {
  const errorString = () => {
    console.log({ errors })
    const nameError = lodashGet(errors, 'name.0')
    const defaultError = lodashGet(errors, 'default.0')

    if (nameError) {
      return `Name ${errors.name[0]}`
    } else if (defaultError) {
      return defaultError
    } else {
      return null
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextField
        affixTextStyle={{
          fontFamily: 'ProximaNova-Regular'
        }}
        baseColor={constants.BRAND.navy}
        containerStyle={{
          borderColor: constants.BRAND.navy,
          margin: 0
        }}
        error={errorString()}
        errorColor={constants.BRAND.red}
        fontSize={24}
        label={'Enter first name...'}
        labelTextStyle={{
          fontFamily: 'ProximaNova-Regular'
        }}
        onChange={onChange}
        textColor={constants.BRAND.navy}
        tintColor={constants.BRAND.navy}
        value={name || ''}
      />
    </View>
  )
}

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: null,
      name: null
    }
  }

  componentDidUpdate (prevProps) {
    if (
      (!prevProps.user && this.props.user) ||
      lodashGet(prevProps.user, 'id') !== lodashGet(this.props.user, 'id')
    ) {
      this.setState({ name: lodashGet(this.props.user, 'name', '') })
    }

    console.log({ error: this.props.error })
    if (!prevProps.error && this.props.error) {
      this.setState({ errors: this.props.error })
    }
  }

  _handleBlur = () => {
    this.setState({
      errors: null,
      name: null
    })
  }

  _onFormSubmit = () => {
    const { updateUser } = this.props

    const errors = this._validateName()

    if (errors) {
      this.setState({ errors })
    } else {
      const { name } = this.state
      updateUser({ name })
    }
  }

  _onNameChange = event => {
    this.setState({
      errors: null,
      name: event.nativeEvent.text
    })
  }

  _validateName = (name = this.state.name) => {
    if (name.length === 0) {
      return {
        name: [`can't be blank`]
      }
    }
  }

  render () {
    const { loading } = this.props
    const { errors, name } = this.state

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 0
    const spinner = loading ? <ActivityIndicator size='large' /> : null

    return (
      <KeyboardAvoidingView
        behavior='position'
        enabled
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
        <NavigationEvents onDidBlur={payload => this._handleBlur()} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          <Image
            source={{
              uri:
                'https://meetalocalstranger.s3.amazonaws.com/images/friendly_encounter.png'
            }}
            style={styles.image}
          />
          <Text style={styles.description}>
            <Text style={styles.bold}>Hello </Text>
            <Text>Stranger</Text>
          </Text>
          <NameInputField
            errors={errors}
            name={name}
            onChange={this._onNameChange}
          />
          {spinner}
        </ScrollView>
        <Button
          handlePress={this._onFormSubmit}
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
  image: {
    width: 300,
    height: 250
  },
  inputContainer: {
    width: '100%'
  },
  scrollView: {
    width: '100%'
  }
})
