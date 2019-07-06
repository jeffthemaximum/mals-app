import lodashGet from 'lodash/get'
import React from 'react'
import { Text } from 'react-native'

export function renderFooter (props) {
  const {
    notifications
  } = props

  console.log({ notifications, props })

  const typistName = lodashGet(notifications, 'typing.actor.name')

  if (typistName) {
    return <Text>{`${typistName} is typing`}</Text>
  } else {
    return <Text>{` `}</Text>
  }
}
