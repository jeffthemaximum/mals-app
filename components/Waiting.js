'use strict'

import React, { Component } from 'react'
import { Bubble } from 'react-native-gifted-chat'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import moment from 'moment'

import * as messageSerializers from '../services/serializers/messages'
import { renderAvatar } from './Avatar'
import constants from '../constants'
import HorizontalRule from './HoritizonalRule'

function renderTime ({ position, currentMessage, timeFormat }, context) {
  const containerStyle = {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  }
  const textStyle = {
    fontSize: 10,
    backgroundColor: 'transparent',
    textAlign: 'right'
  }

  const styles = {
    left: StyleSheet.create({
      container: {
        ...containerStyle
      },
      text: {
        color: '#aaa',
        ...textStyle
      }
    }),
    right: StyleSheet.create({
      container: {
        ...containerStyle
      },
      text: {
        color: '#fff',
        ...textStyle
      }
    })
  }

  return (
    <View style={[styles[position].container, containerStyle[position]]}>
      <Text style={[styles[position].text, textStyle[position]]}>
        {moment(currentMessage.createdAt)
          .locale('en')
          .format('LT')}
      </Text>
    </View>
  )
}

const HumaaanWrapper = ({
  coatColor,
  hairColor,
  hatColor,
  HumaaanComponent,
  pantColor,
  shirtColor,
  shoeColor,
  skinColor
}) => (
  <View style={styles.humaaanContainer}>
    <HumaaanComponent
      coatColor={coatColor}
      hairColor={hairColor}
      hatColor={hatColor}
      height={300}
      pantColor={pantColor}
      shirtColor={shirtColor}
      shoeColor={shoeColor}
      skinColor={skinColor}
    />
  </View>
)

const TopWrapper = ({ serializedRandomMessage }) => (
  <View style={styles.topContainer}>
    <Text style={styles.headerText}>Waiting for a friend...</Text>
    <Text style={styles.headerSubText}>
      You'll automatically jump into a chat once a new user becomes available.
      Here's some sample recent messages in the meantime.
    </Text>
    <WaitingMessage serializedRandomMessage={serializedRandomMessage} />
  </View>
)

const WaitingMessage = ({ serializedRandomMessage }) => {
  const containerStyle = {
    left: {
      flex: 0,
      flexDirection: 'column',
      alignItems: 'center'
    }
  }
  const wrapperStyle = {
    left: {
      marginLeft: 6,
      marginRight: 0
    }
  }

  if (serializedRandomMessage) {
    return (
      <View style={styles.messageContainer}>
        {renderAvatar({ currentMessage: serializedRandomMessage })}
        <Bubble
          currentMessage={serializedRandomMessage}
          renderTime={renderTime}
          user={serializedRandomMessage.user}
          containerStyle={containerStyle}
          wrapperStyle={wrapperStyle}
        />
      </View>
    )
  } else {
    return null
  }
}

export default class Waiting extends Component {
  render () {
    const { randomMessage } = this.props

    const serializedRandomMessage =
      randomMessage && messageSerializers.deserialize(randomMessage)

    return (
      <View style={styles.container}>
        <TopWrapper serializedRandomMessage={serializedRandomMessage} />
        <HorizontalRule />
        <HumaaanWrapper {...this.props} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...constants.BASE_STYLES.container,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  headerSubText: {
    color: constants.BRAND.grey,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center'
  },
  headerText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center'
  },
  humaaanContainer: {
    flexBasis: '60%'
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topContainer: {
    flexBasis: '40%',
    justifyContent: 'center'
  }
})
