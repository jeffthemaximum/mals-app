'use strict'

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Button from 'apsl-react-native-button'
import { TextField } from 'react-native-material-textfield'
import lodashGet from 'lodash/get'

import constants from '../constants'

export default class Home extends Component<{}> {
  constructor (props) {
    super(props)

    this.state = {
      errors: null,
      name: null
    }
  }

  static navigationOptions = {
    title: 'Meet a Local Stranger'
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.user && this.props.user) {
      this.setState({ name: lodashGet(this.props.user, 'name', '') })
    }
  }

  _onFormSubmit = () => {
    const { createChat } = this.props
    const errors = this._validateName()
    if (errors) {
      this.setState({errors})
    } else {
      const { name } = this.state
      createChat({name})
    }
  }

  _onNameChange = (event) => {
    this.setState({
      errors: null,
      name: event.nativeEvent.text
    });
  }

  _validateName = (name = this.state.name) => {
    if (name.length === 0) {
      return {
        name: [
          `can't be blank`
        ]
      }
    }
  }

  render () {
    const { loading, user } = this.props
    const { errors, isFocused, name } = this.state

    const spinner = loading ? (
      <ActivityIndicator size='large' />
    ) : null

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
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
              error={errors && errors.name && errors.name[0] && `Name ${errors.name[0]}`}
              errorColor={constants.BRAND.red}
              fontSize={24}
              label={'Enter first name...'}
              labelTextStyle={{
                fontFamily: 'ProximaNova-Regular'
              }}
              onChange={this._onNameChange}
              textColor={constants.BRAND.navy}
              tintColor={constants.BRAND.navy}
              value={name || ''}
            />
          </View>
          {spinner}
        </ScrollView>
        <Button
          isLoading={loading}
          onPress={this._onFormSubmit}
          style={styles.buttonStyles}
          textStyle={styles.buttonText}
        >
          Let's go
        </Button>
      </View>
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
    fontFamily: 'ProximaNova-Bold',
    fontSize: 18
  },
  bold: {
    fontFamily: 'ProximaNova-Bold'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    color: constants.BRAND.navy,
    fontFamily: 'ProximaNova-Regular',
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
