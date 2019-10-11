'use strict'

import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import camelcaseKeys from 'camelcase-keys'
import lodashGet from 'lodash/get'
import moment from 'moment'
import React, { Component } from 'react'

import { renderAvatar } from './Avatar'
import constants from '../constants'
import NavigationDrawerCta from './NavigationDrawerCta'
import ReportChatModal from '../containers/ReportChatModal'

export default class NavigationDrawer extends Component {
  avatarProps = () => {
    const { user } = this.props

    const avatarProps = {
      size: 60,
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

  memberSince = () => {
    const { user } = this.props

    return moment(lodashGet(user, 'created_at')).format('MMM YYYY')
  }

  renderLeaveChat = () => {
    const { handleLeave, shouldRenderLeaveChat } = this.props

    const LeaveChatCta = () => (
      <View>
        <NavigationDrawerCta
          handleClick={handleLeave}
          iconUri={
            'https://meetalocalstranger.s3.amazonaws.com/images/closeCircleNavy.png'
          }
          text={'Leave chat'}
        />
      </View>
    )

    if (!shouldRenderLeaveChat) {
      return null
    } else {
      return <LeaveChatCta />
    }
  }

  renderReportCta = () => {
    const { handleReportChatCta, shouldRenderReportCta } = this.props

    const ReportCta = () => (
      <View>
        <NavigationDrawerCta
          handleClick={handleReportChatCta}
          iconUri={
            'https://meetalocalstranger.s3.amazonaws.com/images/bellNavy.png'
          }
          text={'Report user'}
        />
      </View>
    )

    if (!shouldRenderReportCta) {
      return null
    } else {
      return <ReportCta />
    }
  }

  userName = () => {
    const { user } = this.props
    let name = lodashGet(user, 'name')
    if (name && name.length > 12) {
      name = `${name.substring(0, 12)}...`
    }

    return name
  }

  render () {
    const { handleReportChatCta, reportChatModalIsVisible } = this.props

    return (
      <View style={styles.container}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          {renderAvatar(this.avatarProps())}
          <Text style={styles.name}>{this.userName()}</Text>
          <Text style={styles.createdAt}>User since {this.memberSince()}</Text>
          {this.renderLeaveChat()}
          {this.renderReportCta()}
        </SafeAreaView>
        {reportChatModalIsVisible && (
          <ReportChatModal
            handleReportChatCta={handleReportChatCta}
            isVisible
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 72,
    padding: 16
  },
  createdAt: {
    color: constants.BRAND.grey,
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 16,
    marginBottom: 48,
    marginTop: 12
  },
  image: {
    height: 230,
    marginTop: 24,
    width: 280
  },
  name: {
    fontFamily: constants.BASE_STYLES.fonts.boldFontFamily,
    fontSize: 24,
    marginTop: 12
  },
  navCta: {
    display: 'flex',
    flexDirection: 'row'
  },
  navIcon: {
    height: 20,
    width: 20
  },
  navText: {
    paddingLeft: 16
  }
})
