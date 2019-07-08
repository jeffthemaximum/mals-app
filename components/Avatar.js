'use-strict'

import React from 'react'
import SvgUri from 'react-native-svg-uri'

export function renderAvatar (props) {
  const svg = props.currentMessage.user.avatarFile

  if (svg) {
    return (
      <SvgUri
        height='35'
        svgXmlData={svg}
        width='35'
      />
    )
  } else {
    const uri = props.currentMessage.user.avatarUrl || `https://avatars.dicebear.com/v2/female/${props.currentMessage.user.name}.svg`
    return (
      <SvgUri
        height='35'
        source={{ uri }}
        width='35'
      />
    )
  }
}
