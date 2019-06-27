'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

import constants from '../constants'

export default class Chat extends Component<{}> {
  render () {
    const {
      chat,
      error,
      loading,
      recipient,
      user
    } = this.props

    return (
      <View style={styles.container}>
        <Text>
          {
            JSON.stringify({
              chat,
              error,
              loading,
              recipient,
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
