'use strict'

import React from 'react'
import { Bubble } from 'react-native-gifted-chat'

import constants from '../constants'

export function renderBubble (props) {
  const textStyle = {
    right: {
      color: constants.BRAND.white,
      fontFamily: 'ProximaNova-Regular'
    }
  }

  const wrapperStyle = {
    right: {
      backgroundColor: constants.BRAND.navy
    }
  }

  return <Bubble {...props} textStyle={textStyle} wrapperStyle={wrapperStyle} />
}
