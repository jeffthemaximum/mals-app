'use strict'

import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const NavigationDrawerCta = ({ handleClick, iconUri, text }) => (
  <TouchableOpacity onPress={handleClick} style={styles.cta}>
    <Image source={{ uri: iconUri }} style={styles.icon} />
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  cta: {
    display: 'flex',
    flexDirection: 'row',
    height: 24,
    marginBottom: 30
  },
  icon: {
    height: 24,
    resizeMode: 'cover',
    width: 24
  },
  text: {
    fontSize: 20,
    paddingLeft: 16
  }
})

export default NavigationDrawerCta
