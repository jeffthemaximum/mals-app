import lodashGet from 'lodash/get'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function renderFooter (props) {
  const {
    notifications
  } = props

  console.log({ notifications, props })

  const typistName = lodashGet(notifications, 'typing.actor.name')
  let text = ' '
  if (typistName) {
    text = `${typistName} is typing...`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
  }
})
