'use strict'

import React from 'react'
import { Image, StyleSheet } from 'react-native'

const FriendlyEncounter = () => (
  <Image
    source={{
      uri:
        'https://meetalocalstranger.s3.amazonaws.com/images/friendly_encounter.png'
    }}
    style={styles.image}
  />
)

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 250
  }
})

export default FriendlyEncounter
