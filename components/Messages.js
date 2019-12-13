'use strict'

import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import camelcaseKeys from 'camelcase-keys'
import lodashGet from 'lodash/get'
import moment from 'moment-timezone'

import { renderAvatar } from './Avatar'
import * as deviceInfoService from '../services/deviceInfoService'
import constants from '../constants'
import LoadingSpinner from './LoadingSpinner'

const LastMessageDate = ({ chat }) => {
  let date = ''
  if (chat.messages && chat.messages.length !== 0) {
    const lastMessageDate = chat.messages[chat.messages.length - 1].createdAt

    let timezone = 'UTC'
    const userTimeZone = lodashGet(deviceInfoService.getInfo(), 'timezone')
    if (userTimeZone) {
      timezone = userTimeZone
    }
    const today = moment().tz(timezone)
    const lastMessageSentToday = moment(lastMessageDate)
      .tz(timezone)
      .isSame(today, 'day')
    if (lastMessageSentToday) {
      date = `${moment(lastMessageDate)
        .tz(timezone)
        .format('hh:mm A')}`
    } else {
      date = `${moment(lastMessageDate)
        .tz(timezone)
        .format('dddd')}`
    }
  }

  return (
    <View style={styles.lastMessageDateContainer}>
      <Text style={styles.lastMessageDateText}>{date}</Text>
      <Image
        source={{
          uri:
            'https://meetalocalstranger.s3.amazonaws.com/images/caretRightBlack.png'
        }}
        style={{
          height: 14,
          width: 9
        }}
      />
    </View>
  )
}

const lastMessageText = ({ chat }) => {
  const maxLength = 55

  if (!chat.messages || chat.messages.length === 0) {
    return ''
  }

  const lastMessageText = chat.messages[chat.messages.length - 1].text

  if (lastMessageText.length > maxLength) {
    return `${lastMessageText.substring(0, maxLength)}...`
  } else {
    return lastMessageText
  }
}

const recipient = ({ chat, user }) =>
  chat.users.find(_user => _user.id !== user.id)

const recipientUserName = ({ chat, user }) => {
  const _recipient = recipient({ chat, user })
  if (_recipient) {
    return user.name
  }

  return _recipient.name || user.name
}

const renderRecipientAvatar = ({ chat, user }) => {
  const _recipient = recipient({ chat, user })

  const avatarProps = {
    size: 48,
    currentMessage: {
      user: {
        avatarUrl: constants.DEFAULT_AVATAR
      }
    }
  }

  if (_recipient && _recipient.name && _recipient.avatar_url) {
    avatarProps.currentMessage.user = camelcaseKeys(_recipient)
  } else {
    if (user && user.name && user.avatarUrl) {
      avatarProps.currentMessage.user = user
    }
  }

  return renderAvatar(avatarProps)
}

const ChatListItem = ({ chat, user }) => (
  <TouchableOpacity style={styles.chatListItemContainer}>
    <View style={styles.recipientAvatarContainer}>
      {renderRecipientAvatar({ chat, user })}
    </View>
    <View style={styles.textContainer}>
      <View style={styles.topTextContainer}>
        <Text style={styles.recipientNameText}>
          {recipientUserName({ chat, user })}
        </Text>
        <LastMessageDate chat={chat} />
      </View>
      <View style={styles.messageTextContainer}>
        <Text style={styles.messageText}>{lastMessageText({ chat })}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

const ChatsList = ({ chats, user }) => (
  <View>
    {chats.map((chat, i) => (
      <ChatListItem chat={chat} key={i} user={user} />
    ))}
  </View>
)

const Header = () => (
  <View style={styles.headerContainer}>
    <View>
      <Image
        source={{
          uri:
            'https://meetalocalstranger.s3.amazonaws.com/images/chatSmileNavy.png'
        }}
        style={styles.newChatIcon}
      />
    </View>
    <View>
      <Text style={styles.headerHeader}>Messages</Text>
    </View>
  </View>
)

const Loading = () => <LoadingSpinner />

const Messages = ({ chats, error, loading, user }) => (
  <ScrollView>
    <Header />
    {error && <Text>error</Text>}
    {loading && <Loading />}
    {chats && <ChatsList chats={chats} user={user} />}
  </ScrollView>
)

const styles = StyleSheet.create({
  chatListItemContainer: {
    borderBottomColor: constants.BRAND.grey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 100,
    padding: 10
  },
  headerContainer: {
    backgroundColor: constants.BRAND.paleBlue,
    flexDirection: 'column',
    height: 150,
    justifyContent: 'space-between',
    padding: 10
  },
  headerHeader: {
    color: constants.BRAND.navy,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 36
  },
  lastMessageDateContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  lastMessageDateText: {
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 14,
    paddingRight: 10
  },
  messageText: {
    color: constants.BRAND.black,
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 14
  },
  messageTextContainer: {
    flexDirection: 'row'
  },
  newChatIcon: {
    height: 36,
    marginLeft: 'auto',
    width: 36
  },
  recipientAvatarContainer: {
    alignSelf: 'center',
    paddingRight: 20
  },
  recipientNameText: {
    color: constants.BRAND.black,
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 14
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1
  },
  topTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  }
})

export default Messages
