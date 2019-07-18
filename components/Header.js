'use strict'

import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

export default class Header extends Component {
  render () {
    const { handlePress } = this.props

    console.log({ handlePress })

    return (
      <TouchableOpacity onPress={handlePress} style={styles.container}>
        <Image
          source={{
            uri:
              'https://meetalocalstranger.s3.amazonaws.com/images/handburger.png'
          }}
          style={styles.handburger}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12
  },
  handburger: {
    height: 21,
    width: 25
  }
})
