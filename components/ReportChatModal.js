'use strict'

import { StyleSheet, Text, TextInput, View } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'

import Button from './Button'
import constants from '../constants'

const ReportChatModal = ({
  isVisible,
  handleBackdropPress,
  handleCloseClick,
  handlePress,
  loading,
  reportError,
  reportSuccess
}) => {
  const [value, onChangeText] = React.useState(null)

  return (
    <View style={styles.container}>
      <Modal
        avoidKeyboard={true}
        isVisible={isVisible}
        onBackdropPress={() => handleBackdropPress()}
      >
        {!reportSuccess && (
          <View style={styles.content}>
            <Text style={styles.header}>Report</Text>
            <TextInput
              editable
              multiline
              numberOfLines={8}
              onChangeText={text => onChangeText(text)}
              placeholder={constants.REPORT_CHAT_COPY}
              style={styles.textInput}
              value={value}
            />
            {reportError && (
              <Text style={styles.textError}>
                {constants.REPORT_MODAL_ERROR}
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <Button
                buttonStyles={{
                  alignSelf: 'stretch',
                  backgroundColor: constants.BRAND.grey,
                  borderColor: constants.BRAND.grey,
                  width: '48%'
                }}
                handlePress={handleCloseClick}
                isLoading={loading}
                text={'Cancel'}
              />
              <Button
                buttonStyles={{
                  alignSelf: 'stretch',
                  borderColor: constants.BRAND.navy,
                  marginLeft: 12,
                  width: '48%'
                }}
                handlePress={() => handlePress(value)}
                isLoading={loading}
                text={'Submit'}
              />
            </View>
          </View>
        )}
        {reportSuccess && (
          <View style={styles.content}>
            <Text style={styles.header}>Report</Text>
            <Text style={[styles.text, styles.textSuccess]}>
              {constants.REPORT_MODAL_SUCCESS}
            </Text>
            <Button
              handlePress={handleCloseClick}
              isLoading={loading}
              text={'Close'}
            />
          </View>
        )}
      </Modal>
    </View>
  )
}

const { container, content, header, text } = constants.BASE_STYLES.modal

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  container,
  content,
  header,
  text,
  textError: {
    color: constants.BRAND.red,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 12,
    marginBottom: 12
  },
  textInput: {
    borderColor: constants.BRAND.black,
    borderRadius: 4,
    borderWidth: 1,
    height: 200,
    marginBottom: 32,
    width: '100%',
    padding: 4,
    paddingBottom: 16
  },
  textSuccess: {
    marginBottom: 32
  }
})

export default ReportChatModal
