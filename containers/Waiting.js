'use strict'

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import lodashGet from 'lodash/get'

import * as humaaans from '../components/humaaans'
import constants from '../constants'
import messages from '../ducks/messages'
import WaitingComponent from '../components/Waiting'
import withNavigationName from './withNavigationName'
import withUser from './withUser'

const {
  actions: { getRandomMessage },
  selectors: { randomMessage: randomMessageSelector }
} = messages

const brandWithoutWhite = Object.values(constants.BRAND).filter(
  color => color !== constants.BRAND.white
)

const randomItem = items => items[Math.floor(Math.random() * items.length)]

class Waiting extends Component {
  state = {
    coatColor: randomItem(brandWithoutWhite),
    hairColor: randomItem(constants.HUMAAANS_HAIR_COLOR),
    hatColor: randomItem(brandWithoutWhite),
    HumaaanComponent: humaaans[randomItem(Object.keys(humaaans))],
    intervalId: null,
    pantColor: randomItem(brandWithoutWhite),
    shirtColor: randomItem(brandWithoutWhite),
    shoeColor: randomItem(brandWithoutWhite),
    skinColor: randomItem(constants.HUMAAANS_SKIN_COLOR)
  }

  componentDidMount () {
    const handleFocus = this.handleFocus
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      payload => {
        handleFocus()
      }
    )

    const handleBlur = this.handleBlur
    this.didBlurSubscription = this.props.navigation.addListener(
      'didBlur',
      payload => {
        handleBlur()
      }
    )
  }

  componentDidUpdate (prevProps) {
    const prevRandomMessageId = lodashGet(prevProps, 'randomMessage.id')
    const randomMessageId = lodashGet(this.props, 'randomMessage.id')
    const shouldUpdateHumaaan =
      !!prevRandomMessageId && prevRandomMessageId !== randomMessageId
    if (shouldUpdateHumaaan) {
      this.resetHumaaanStyle()
    }
  }

  componentWillUnmount () {
    this.handleBlur()
    this.didBlurSubscription && this.didBlurSubscription.remove()
    this.didFocusSubscription && this.didFocusSubscription.remove()
  }

  handleBlur = () => {
    const { intervalId } = this.state

    if (intervalId) {
      clearInterval(intervalId)
      this.setState({ intervalId: null })
    }
  }

  handleFocus = () => {
    let { intervalId } = this.state

    if (!intervalId) {
      const { getRandomMessage } = this.props

      getRandomMessage()
      intervalId = setInterval(getRandomMessage, 3000)
      this.setState({ intervalId })
    }
  }

  resetHumaaanStyle = () => {
    this.setState({
      coatColor: randomItem(brandWithoutWhite),
      hairColor: randomItem(constants.HUMAAANS_HAIR_COLOR),
      hatColor: randomItem(brandWithoutWhite),
      HumaaanComponent: humaaans[randomItem(Object.keys(humaaans))],
      pantColor: randomItem(brandWithoutWhite),
      shirtColor: randomItem(brandWithoutWhite),
      shoeColor: randomItem(brandWithoutWhite),
      skinColor: randomItem(constants.HUMAAANS_SKIN_COLOR)
    })
  }

  render () {
    const { denyRequest, startChat, status } = this.props

    return (
      <WaitingComponent
        denyRequest={denyRequest}
        randomMessage={this.props.randomMessage}
        startChat={startChat}
        status={status}
        {...this.state}
      />
    )
  }
}

const mapStateToProps = state => {
  const randomMessage = randomMessageSelector(state)

  return {
    randomMessage
  }
}

const mapDispatchToProps = {
  getRandomMessage
}

const enhance = compose(
  withNavigationName(constants.NAVIGATION_NAMES.waiting),
  withUser,
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(Waiting)
