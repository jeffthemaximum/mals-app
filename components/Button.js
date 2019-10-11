'use strict'

import React from 'react'
import { StyleSheet } from 'react-native'
import Button from 'apsl-react-native-button'

import constants from '../constants'

const CustomButton = ({
  buttonStyles = {},
  isLoading,
  handlePress,
  text,
  textStyles = {}
}) => {
  return (
    <Button
      isLoading={isLoading}
      onPress={handlePress}
      style={[styles.buttonStyles, buttonStyles]}
      textStyle={[styles.buttonText, textStyles]}
    >
      {text}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonStyles: {
    backgroundColor: constants.BRAND.navy
  },
  buttonText: {
    color: constants.BRAND.white,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 18
  }
})

export default CustomButton
