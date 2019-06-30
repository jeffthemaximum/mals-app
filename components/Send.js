import React from 'react'
import { Send } from 'react-native-gifted-chat'

import constants from '../constants'

export function renderSend (props) {
  const textStyle = {
    color: constants.BRAND.teal
  }

  return <Send {...props} textStyle={textStyle} />
}
