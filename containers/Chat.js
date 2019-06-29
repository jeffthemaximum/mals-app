'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { ActionCableConsumer, ActionCableProvider } from 'react-actioncable-provider'
import ActionCable from 'action-cable-react-jwt'

import * as clientStorage from '../services/clientStorage'
import { generateHeaders } from '../services/requestHeaders'
import constants from '../constants'
import users from '../ducks/users'

import ChatComponent from '../components/Chat'
import MessagesCable from '../components/MessageCable'

const {
  selectors: { getUser: getUserSelector }
} = users

class Chat extends Component {
  state = {
    chat: null,
    jwt: null,
    loading: false
  }

  async componentDidMount () {
    const jwt = await clientStorage.get(constants.JWT)
    const cable = ActionCable.createConsumer(constants.API_WS_ROOT, jwt)

    this.setState({ cable, jwt })
  }

  _createChat = async () => {
    const { chat, loading } = this.state
    const { user } = this.props

    if (!loading && !chat) {
      this.setState({ loading: true })
      const jwt = await clientStorage.get(constants.JWT)
      fetch(`${constants.API_ROOT}/api/v1/chats`, {
        method: 'POST',
        headers: generateHeaders({ jwt }),
        body: JSON.stringify({ user })
      })
        .then(() => this.setState({
          loading: false
        }))
    }
  }

  _handleReceivedChat = response => {
    const { chat } = response
    this.setState({
      chat
    })
  }

  _handleReceivedMessage = response => {
    const { message } = response
    const chat = { ...this.state.chat }
    chat.messages = [...chat.messages, message]
    this.setState({ chat })
  }

  render () {
    const { cable, chat, jwt } = this.state
    const { user } = this.props

    return (
      <View style={styles.container}>
        { cable && jwt &&
          <ActionCableProvider cable={cable}>
            <View>
              <ActionCableConsumer
                channel={{ channel: 'ChatsChannel' }}
                onConnected={this._createChat}
                onReceived={(res) => this._handleReceivedChat(res)}
              />
              {chat && (
                <View>
                  <MessagesCable
                    chat={chat}
                    handleReceivedMessage={this._handleReceivedMessage}
                  />
                  <ChatComponent chat={chat} user={user} />
                </View>
              )}
            </View>
          </ActionCableProvider>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: constants.BASE_STYLES.container
})

const mapStateToProps = state => {
  const user = getUserSelector(state)

  return {
    user
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
