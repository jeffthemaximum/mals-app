'use strict'

import React from 'react'
import Modal from 'react-native-modal'
import { StyleSheet, Text, View } from 'react-native'

import Button from './Button'
import constants from '../constants'

const EulaModal = ({ isVisible, handlePress, loading }) => {
  return (
    <View>
      <Modal animationInTiming={0} isVisible={isVisible}>
        <View style={styles.content}>
          <Text style={styles.text}>{constants.EULA_COPY}</Text>
          <Button
            handlePress={handlePress}
            isLoading={loading}
            text='Accept'
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  text: {
    marginBottom: 24
  }
})

export default EulaModal
