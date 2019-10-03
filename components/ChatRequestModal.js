'use strict'

import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'

import constants from '../constants'
import TwoButtonRow from './TwoButtonRow'

const ChatRequestModal = ({ chatDistance, denyRequest, handlePress, isVisible, recipientName }) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
      >
        <View style={styles.content}>
          <Text style={styles.header}>New chat</Text>
          <Text style={styles.text}>{constants.REQUEST_CHAT_COPY(recipientName, chatDistance)}</Text>
          <TwoButtonRow
            acceptText={'Accept'}
            cancelText={'Deny'}
            handleAcceptClick={handlePress}
            handleCancelClick={denyRequest}
          />
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

export default ChatRequestModal
