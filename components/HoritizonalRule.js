import React from 'react'
import { StyleSheet, View } from 'react-native'

import constants from '../constants'

const HorizontalRule = ({ lineStyle = {} }) => (
  <View style={styles.lineContainer}>
    <View style={[styles.lineStyle, lineStyle]} />
  </View>
)

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    marginBottom: 24
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: constants.BRAND.navy,
    flex: 1
  }
})

export default HorizontalRule
