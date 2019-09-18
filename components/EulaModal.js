'use strict'

import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'

import Button from './Button'
import constants from '../constants'

const EulaModal = ({ isVisible, handlePress, loading }) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.content}>
          <Text style={styles.header}>End User License Agreement</Text>
          <Text style={styles.text}>{constants.EULA_COPY}</Text>
          <Button handlePress={handlePress} isLoading={loading} text='Accept' />
        </View>
      </Modal>
    </View>
  )
}

const { container, content, header, text } = constants.BASE_STYLES.modal

const styles = StyleSheet.create({
  container,
  content,
  header,
  text
})

export default EulaModal
