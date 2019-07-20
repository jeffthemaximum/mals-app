'use strict'

import React, { Component } from 'react'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'

import Button from './Button'
import constants from '../constants'
import HorizonalRule from './HoritizonalRule'

export default class NavigationDrawer extends Component {
  render () {
    const { handleLeave } = this.props

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <Image
            source={{
              uri:
                'https://meetalocalstranger.s3.amazonaws.com/images/friendly_encounter.png'
            }}
            style={styles.image}
          />
          <HorizonalRule />
          <Button
            buttonStyles={{
              backgroundColor: constants.BRAND.red,
              borderColor: constants.BRAND.red,
              marginLeft: 8,
              marginRight: 8
            }}
            handlePress={handleLeave}
            text={`Leave chat`}
          />
        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 230,
    marginTop: 24,
    width: 280
  }
})
