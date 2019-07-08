import lodashGet from 'lodash/get'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import constants from '../constants'

export function renderFooter (props) {
  const {
    notifications
  } = props

  console.log({ notifications, props })

  const typistName = lodashGet(notifications, 'typing.actor.name')
  const unsubscribedName = lodashGet(notifications, 'unsubscribed.actor.name')

  let text = ' '
  let style = styles.text
  if (unsubscribedName) {
    text = `${unsubscribedName} left.`
    style = styles.textRed
  } else if (typistName) {
    text = `${typistName} is typing...`
  }

  return (
    <View style={styles.container}>
      <Text style={style}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    paddingBottom: 4
  },
  text: {
    color: '#aaa',
    fontSize: 12
  },
  textRed: {
    color: constants.BRAND.red,
    fontSize: 12
  }
})
