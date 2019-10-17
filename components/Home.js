'use strict'

import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import constants from '../constants'
import FriendlyEncounter from './FriendlyEncounter'
import navigationService from '../services/navigationService'

const UserName = ({ user }) => {
  const _userName = () => {
    if (!user.name) {
      return 'Stranger'
    } else if (user.name.length > 15) {
      return `${user.name.substring(0, 12)}...`
    } else {
      return user.name
    }
  }

  const styles = userName => {
    let fontSize = 36

    if (userName.length > 12) {
      fontSize = 16
    } else if (userName.length > 9) {
      fontSize = 20
    } else if (userName.length > 6) {
      fontSize = 26
    }

    return { fontSize }
  }

  const userName = _userName()
  return <Text style={styles(userName)}>{userName}</Text>
}

const HomeLink = ({ destination, imageUri, text }) => {
  const handlePress = () => navigationService.navigate(destination)

  return (
    <TouchableOpacity onPress={handlePress} style={styles.link}>
      <Image
        source={{
          uri: imageUri
        }}
        style={styles.linkIcon}
      />
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  )
}

const HomeLinks = () => (
  <View style={styles.linkContainer}>
    <HomeLink
      destination={constants.NAVIGATION_NAMES.chat}
      imageUri={
        'https://meetalocalstranger.s3.amazonaws.com/images/chatSmileNavy.png'
      }
      text={'Chat with a random user'}
    />
    <HomeLink
      destination={constants.NAVIGATION_NAMES.profile}
      imageUri={
        'https://meetalocalstranger.s3.amazonaws.com/images/avatarNavy.png'
      }
      text={'View my profile'}
    />
  </View>
)

const Greetings = ({ user }) => (
  <Text style={styles.description}>
    <Text style={styles.bold}>Hello </Text>
    <UserName user={user} />
  </Text>
)

export default class Home extends Component {
  render () {
    const { user } = this.props
    const { height, width } = Dimensions.get('window')
    const imageStyles = {
      height: height * 0.30788,
      width: width * 0.8
    }

    return (
      <View style={styles.container}>
        <View
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          <Text style={styles.headerText}>SayHey</Text>
          <Text style={styles.subheaderText}>Random local chat</Text>
          <FriendlyEncounter imageStyles={imageStyles} />
          <Greetings user={user} />
          <HomeLinks />
        </View>
      </View>
    )
  }
}

let subheaderTextMarginBottom = 80
const { height } = Dimensions.get('window')
if (height < 700) {
  subheaderTextMarginBottom = 48
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily
  },
  container: constants.BASE_STYLES.container,
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 36,
    marginBottom: 48,
    marginTop: 24,
    textAlign: 'center'
  },
  headerText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 48,
    marginBottom: 16,
    marginTop: 30,
    textAlign: 'center'
  },
  image: {
    width: 300,
    height: 250
  },
  link: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 32
  },
  linkContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  linkIcon: {
    height: 28,
    marginRight: 10,
    width: 28
  },
  linkText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 24
  },
  scrollView: {
    height: '100%',
    width: '100%'
  },
  subheaderText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 24,
    marginBottom: subheaderTextMarginBottom,
    textAlign: 'center'
  }
})
