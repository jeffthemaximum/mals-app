'use strict'

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import camelcaseKeys from 'camelcase-keys'

import { renderAvatar } from './Avatar'
import Button from './Button'
import constants from '../constants'

const UserName = ({ user }) => {
  const _userName = () => {
    if (!user.name) {
      return 'Stranger'
    } else {
      return user.name
    }
  }

  const styles = userName => {
    let fontSize = 48

    if (userName.length > 15) {
      fontSize = 24
    } else if (userName.length > 12) {
      fontSize = 32
    } else if (userName.length > 8) {
      fontSize = 36
    }

    return {
      color: constants.BRAND.navy,
      fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
      fontSize,
      marginBottom: 48
    }
  }

  const userName = _userName()
  return <Text style={styles(userName)}>{userName}</Text>
}

const Avatar = ({ user }) => {
  const avatarProps = () => {
    const avatarProps = {
      size: 100,
      currentMessage: {
        user: {
          avatarUrl: constants.DEFAULT_AVATAR
        }
      }
    }

    if (user) {
      avatarProps.currentMessage.user = camelcaseKeys(user)
    }

    return avatarProps
  }

  return renderAvatar(avatarProps())
}

const NewAvatarButton = ({ getNewAvatar, loading }) => {
  let buttonStyles = constants.BASE_STYLES.buttons.inverse.small.button
  if (loading) {
    buttonStyles = {
      ...buttonStyles,
      width: 148.3
    }
  }

  return (
    <Button
      buttonStyles={buttonStyles}
      handlePress={getNewAvatar}
      isLoading={loading}
      text={'New random avatar'}
      textStyles={constants.BASE_STYLES.buttons.inverse.small.text}
    />
  )
}

const ActionButtons = ({ dirty, goBack, saveProfile }) => {
  return (
    <View style={styles.actionButtonsContainer}>
      <Button
        buttonStyles={constants.BASE_STYLES.buttons.inverse.fullWidth.button}
        handlePress={goBack}
        text={dirty ? 'Cancel' : 'Back'}
        textStyles={constants.BASE_STYLES.buttons.inverse.fullWidth.text}
      />
      {
        dirty && <Button handlePress={saveProfile} text={'Submit'} />
      }
    </View>
  )
}

const Profile = ({
  dirty,
  getNewAvatar,
  goBack,
  loading,
  saveProfile,
  user
}) => (
  <View style={styles.container}>
    <View style={styles.centeredView}>
      <UserName user={user} />
      <Avatar user={user} />
      <NewAvatarButton getNewAvatar={getNewAvatar} loading={loading} />
      <ActionButtons dirty={dirty} goBack={goBack} saveProfile={saveProfile} />
    </View>
  </View>
)

const styles = StyleSheet.create({
  actionButtonsContainer: {
    alignSelf: 'flex-end',
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%'
  },
  avatarContainer: {
    marginBottom: 32
  },
  container: constants.BASE_STYLES.containerNoCenter,
  centeredView: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%'
    // justifyContent: 'center'
  }
})

export default Profile
