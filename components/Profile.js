'use strict'

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import camelcaseKeys from 'camelcase-keys'

import { renderAvatar } from './Avatar'
import Button from './Button'
import constants from '../constants'
import NameInputField from './NameInputField'

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
      {dirty && <Button handlePress={saveProfile} text={'Save'} />}
    </View>
  )
}

const Name = ({ errors, handleNameChange, name, setRef }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldText}>First name:</Text>
      <NameInputField
        containerStyles={{
          flexGrow: 1
        }}
        errors={errors}
        fontSize={18}
        onChange={handleNameChange}
        name={name}
        setRef={setRef}
      />
    </View>
  )
}

const Location = ({ locationName }) => (
  <View
    style={[
      styles.fieldContainer,
      {
        flexWrap: 'wrap',
        marginTop: 24
      }
    ]}
  >
    <Text
      style={[
        styles.fieldText,
        {
          paddingBottom: 0
        }
      ]}
    >
      Location:
    </Text>
    <View style={styles.locationTextContainer}>
      <Text style={styles.locationText}>{locationName}</Text>
    </View>
  </View>
)

const Profile = ({
  dirty,
  errors,
  getNewAvatar,
  goBack,
  handleNameChange,
  loading,
  locationName,
  name,
  saveProfile,
  setRef,
  user
}) => (
  <View style={styles.container}>
    <View style={styles.centeredView}>
      <UserName user={user} />
      <Avatar user={user} />
      <NewAvatarButton getNewAvatar={getNewAvatar} loading={loading} />
      <ActionButtons dirty={dirty} goBack={goBack} saveProfile={saveProfile} />
      <Name
        errors={errors}
        handleNameChange={handleNameChange}
        name={name}
        setRef={setRef}
      />
      {locationName && <Location locationName={locationName} />}
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
  },
  fieldContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%'
  },
  fieldText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 18,
    paddingBottom: 18,
    paddingRight: 12
  },
  locationText: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 18
  },
  locationTextContainer: {}
})

export default Profile
