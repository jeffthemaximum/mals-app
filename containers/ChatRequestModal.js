'use strict'

import { connect } from 'react-redux'
import { compose } from 'redux'
import React, { Component } from 'react'

import chats from '../ducks/chats'
import ChatRequestModalComponent from '../components/ChatRequestModal'

const {
  selectors: {
    chatDistance: chatDistanceSelector,
    recipientName: recipientNameSelector
  }
} = chats

class ChatRequestModal extends Component {
  state = {
    isVisible: true
  }

  render () {
    const { chatDistance, recipientName, startChat, viewProfile } = this.props
    const { isVisible } = this.state

    return (
      <ChatRequestModalComponent
        chatDistance={chatDistance}
        handlePress={startChat}
        isVisible={isVisible}
        recipientName={recipientName}
        viewProfile={viewProfile}
      />
    )
  }
}

const mapStateToProps = state => {
  const chatDistance = chatDistanceSelector(state)
  const recipientName = recipientNameSelector(state)

  return {
    chatDistance,
    recipientName
  }
}

const mapDispatchToProps = {}

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(ChatRequestModal)
