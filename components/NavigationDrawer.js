'use strict'

import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import camelcaseKeys from 'camelcase-keys'
import lodashGet from 'lodash/get'
import moment from 'moment'
import React, { Component } from 'react'

import { renderAvatar } from './Avatar'
import constants from '../constants'
import HorizonalRule from './HoritizonalRule'
import NavigationDrawerCta from './NavigationDrawerCta'

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
    const { shouldRenderLeaveChat } = this.props

    const LeaveChatCta = () => (
      <View>
        <NavigationDrawerCta
          iconUri={
            'https://meetalocalstranger.s3.amazonaws.com/images/closeCircleRed.png'
          }
          text={'Report user'}
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
    const { shouldRenderReportCta } = this.props

    const ReportCta = () => (
      <View>
        <NavigationDrawerCta
          iconUri={
            'https://meetalocalstranger.s3.amazonaws.com/images/closeCircleRed.png'
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

    return lodashGet(user, 'name')
  }

  render () {
    return (
      <View style={styles.container}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          {renderAvatar(this.avatarProps())}
          <Text style={styles.name}>{this.userName()}</Text>
          <Text style={styles.createdAt}>User since {this.memberSince()}</Text>
          {/* <Image
            source={{
              uri:
                'https://meetalocalstranger.s3.amazonaws.com/images/friendly_encounter.png'
            }}
            style={styles.image}
          /> */}
          <HorizonalRule />
          {/* <Button
            buttonStyles={{
              backgroundColor: constants.BRAND.red,
              borderColor: constants.BRAND.red,
              marginLeft: 8,
              marginRight: 8
            }}
            handlePress={handleLeave}
            text={`Leave chat`}
          /> */}
          {this.renderReportCta()}
          {this.renderLeaveChat()}
          <View>
            <View>
              <Image />
            </View>
          </View>
        </SafeAreaView>
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
    marginBottom: 12,
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
