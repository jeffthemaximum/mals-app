'use strict'

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Button from './Button'
import constants from '../constants'

const TwoButtonRow = ({
  acceptText = 'Submit',
  cancelText = 'Cancel',
  handleAcceptClick,
  handleCancelClick,
  loading = false,
  value
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        buttonStyles={{
          alignSelf: 'stretch',
          backgroundColor: constants.BRAND.grey,
          borderColor: constants.BRAND.grey,
          width: '48%'
        }}
        handlePress={handleCancelClick}
        isLoading={loading}
        text={cancelText}
      />
      <Button
        buttonStyles={{
          alignSelf: 'stretch',
          borderColor: constants.BRAND.navy,
          marginLeft: 12,
          width: '48%'
        }}
        handlePress={() => handleAcceptClick(value)}
        isLoading={loading}
        text={acceptText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
})

export default TwoButtonRow
