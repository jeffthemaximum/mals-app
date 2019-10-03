'use strict'

import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import constants from '../constants'
import LoadingSpinner from './LoadingSpinner'

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://meetalocalstranger.s3.amazonaws.com/images/friendly_encounter.png'
        }}
        style={styles.image}
      />
      <LoadingSpinner />
    </View>
  )
}

const styles = StyleSheet.create({
  container: constants.BASE_STYLES.container,
  image: {
    width: '80%',
    height: 250
  }
})

export default Splash
