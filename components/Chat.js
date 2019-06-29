'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import constants from '../constants'

export default class Chat extends Component {
  render () {
    const {
      chat,
      user
    } = this.props

    console.log(chat)

    return (
      <View style={styles.container}>
        <Text>
          {
            JSON.stringify({
              chat,
              user
            })
          }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: constants.BASE_STYLES.container
})
