'use strict'

import React, { Component } from 'react'
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

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
        <ScrollView>
          <Image source={{ uri: 'https://meetalocalstranger.s3.amazonaws.com/images/friendly_encounter.png' }} style={styles.image} />
          <Text style={styles.description}>
            <Text style={styles.bold}>Hello </Text>
            <Text>Stranger</Text>
          </Text>
          <TextInput
            onChange={this._onSearchTextChanged}
            placeholder='Search via name or postcode'
            style={styles.searchInput}
            value={this.state.searchString}
          />
          {spinner}
        </ScrollView>
        <View style={styles.footer}>
          <Button onPress={this._onSearchPressed} color='#48BBEC' title='Go' />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'ProximaNova-Bold'
  },
  description: {
    color: '#404040',
    fontFamily: 'ProximaNova-Regular',
    fontSize: 36,
    marginBottom: 36,
    marginTop: 24,
    textAlign: 'center',
  },
  container: {
    padding: 30,
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
