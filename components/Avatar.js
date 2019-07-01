'use-strict'

import React from 'react'
import SvgUri from 'react-native-svg-uri'

export function renderAvatar (props) {
  const uri = props.currentMessage.user.avatar || `https://avatars.dicebear.com/v2/female/${props.currentMessage.user.name}.svg`

  return (
    <SvgUri
      height='35'
      source={{ uri }}
      width='35'
    />
  )
}
