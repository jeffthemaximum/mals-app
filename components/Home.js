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

import constants from '../constants'

export default class Home extends Component<{}> {
  constructor (props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  static navigationOptions = {
    title: 'Meet a Local Stranger'
  }

  render () {
    const spinner = this.state.isLoading ? (
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
              errorColor={constants.BRAND.red}
              fontSize={24}
              label={'Enter first name...'}
              labelTextStyle={{
                fontFamily: 'ProximaNova-Regular'
              }}
              onChange={this._onSearchTextChanged}
              textColor={constants.BRAND.navy}
              tintColor={constants.BRAND.navy}
              value={this.state.searchString}
            />
          </View>
          {spinner}
        </ScrollView>
        <Button
          onPress={this._onSearchPressed}
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
  scrollView: {
    width: '100%'
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
  container: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  footer: {
    alignSelf: 'flex-end'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  image: {
    width: 300,
    height: 250
  },
  inputContainer: {
    width: '100%'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
})
