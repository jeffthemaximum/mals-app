'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import lodashGet from 'lodash/get'

import * as humaaans from '../components/humaaans'
import constants from '../constants'
import messages from '../ducks/messages'
import WaitingComponent from '../components/Waiting'

const {
  actions: { getRandomMessage },
  selectors: { randomMessage: randomMessageSelector }
} = messages

const brandWithoutWhite = Object.values(constants.BRAND).filter(
  color => color !== constants.BRAND.white
)

const randomItem = items => items[Math.floor(Math.random() * items.length)]

const SKIN = [
  '#8D5524',
  '#C68642',
  '#E0AC69',
  '#F1C27D',
  '#FFDBAC',
  '#260701',
  '#3D0C02',
  '#843722',
  '#AF6E51',
  '#C69076'
]

const HAIR = [
  '#090806',
  '#2C222B',
  '#71635A',
  '#B7A69E',
  '#D6C4C2',
  '#CABFB1',
  '#DCD0BA',
  '#FFF5E1',
  '#E6CEA8',
  '#E5C8A8',
  '#DEBC99',
  '#B89778',
  '#A56B46',
  '#B55239',
  '#8D4A43',
  '#91553D',
  '#533D32',
  '#3B3024',
  '#554838',
  '#4E433F',
  '#504444',
  '#6A4E42',
  '#A7856A',
  '#977961'
]

class Waiting extends Component {
  state = {
    coatColor: randomItem(brandWithoutWhite),
    hairColor: randomItem(HAIR),
    hatColor: randomItem(brandWithoutWhite),
    HumaaanComponent: humaaans[randomItem(Object.keys(humaaans))],
    pantColor: randomItem(brandWithoutWhite),
    shirtColor: randomItem(brandWithoutWhite),
    shoeColor: randomItem(brandWithoutWhite),
    skinColor: randomItem(SKIN)
  }

  componentDidMount () {
    const { getRandomMessage } = this.props
    getRandomMessage()
    this.interval = setInterval(getRandomMessage, 3000)
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
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  resetHumaaanStyle = () => {
    this.setState({
      coatColor: randomItem(brandWithoutWhite),
      hairColor: randomItem(HAIR),
      hatColor: randomItem(brandWithoutWhite),
      HumaaanComponent: humaaans[randomItem(Object.keys(humaaans))],
      pantColor: randomItem(brandWithoutWhite),
      shirtColor: randomItem(brandWithoutWhite),
      shoeColor: randomItem(brandWithoutWhite),
      skinColor: randomItem(SKIN)
    })
  }

  render () {
    return <WaitingComponent randomMessage={this.props.randomMessage} {...this.state} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting)
