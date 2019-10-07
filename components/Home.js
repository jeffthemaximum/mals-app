'use strict'

import React, { Component } from 'react'
import {
  Image,
  ScrollView,
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
      return user.name.substring(0, 14)
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

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.scrollView}
        >
          <Text style={styles.headerText}>SayHey</Text>
          <Text style={styles.subheaderText}>Random local chat</Text>
          <FriendlyEncounter />
          <Greetings user={user} />
          <HomeLinks />
        </ScrollView>
      </View>
    )
  }
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
    marginTop: 30
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
    marginTop: 48,
    width: '100%'
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
    width: '100%'
  },
  subheaderText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 24,
    marginBottom: 80
  }
})
