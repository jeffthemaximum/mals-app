'use strict'

import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NavigationDrawerCta = ({
  iconUri,
  text
}) => (
  <View style={styles.cta}>
    <Image
      source={{ uri: iconUri }}
      style={styles.icon}
    />
    <Text style={styles.text}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  cta: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    height: 20,
    width: 20
  },
  text: {
    paddingLeft: 16
  }
})

export default NavigationDrawerCta
