'use-strict'

import { Image } from 'react-native'
import isSvg from 'is-svg'
import React from 'react'
import SvgUri from 'react-native-svg-uri'

import constants from '../constants'

const defaultSvgName = Math.random()
  .toString(36)
  .substring(2, 15)

export function renderAvatar (props) {
  let svg
  if (isSvg(props.currentMessage.user.avatarFile)) {
    svg = props.currentMessage.user.avatarFile
  }

  const name = props.currentMessage.user.name || defaultSvgName

  const size = props.size || 35

  try {
    if (svg) {
      return (
        <SvgUri
          height={size}
          svgXmlData={svg}
          width={size}
        />
      )
    } else {
      const uri = props.currentMessage.user.avatarUrl || `https://avatars.dicebear.com/v2/female/${name}.svg`
      return (
        <SvgUri
          height={size}
          source={{ uri }}
          width={size}
        />
      )
    }
  } catch (e) {
    return (
      <Image
        source={{
          uri:
            constants.DEFAULT_AVATAR
        }}
        style={{
          height: size,
          width: size
        }}
      />
    )
  }
}
