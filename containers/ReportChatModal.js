'use strict'

import { connect } from 'react-redux'
import { compose } from 'redux'
import React, { Component } from 'react'

import chats from '../ducks/chats'
import constants from '../constants'
import ReportChatModalComponent from '../components/ReportChatModal'
import { withNavigation } from 'react-navigation'

const {
  actions: { reportChat, resetReportChat },
  selectors: {
    chatId: chatIdSelector,
    reportError: reportErrorSelector,
    reportLoading: reportLoadingSelector,
    reportSuccess: reportSuccessSelector
  }
} = chats

class ReportChatModal extends Component {
  state = {
    error: false,
    isVisible: false,
    success: false
  }

  componentDidMount () {
    const { isVisible } = this.props

    if (typeof isVisible === 'boolean') {
      this.setState({ isVisible })
    }
  }

  componentDidUpdate (prevProps) {
    const clearedError =
      prevProps.reportError && !this.props.reportError && this.state.error
    const newError =
      !prevProps.reportError && this.props.reportError && !this.state.error
    const newSuccess =
      !prevProps.reportSuccess &&
      this.props.reportSuccess &&
      !this.state.reportSuccess

    if (newError) {
      this.setState({ error: true })
    }

    if (clearedError) {
      this.setState({ error: false })
    }

    if (newSuccess) {
      this.setState({ success: true })
    }
  }

  componentWillUnmount () {
    const { resetReportChat } = this.props

    resetReportChat()
  }

  handleBackdropPress = () => {
    const { reportLoading } = this.props

    if (!reportLoading) {
      this.toggleModal()
    }
  }

  handleSubmit = content => {
    const { chatId, reportChat } = this.props

    if (chatId) {
      reportChat(chatId, content) // TODO message
    }
  }

  handleCloseClick = () => {
    const { navigation } = this.props
    const { success } = this.state

    if (success) {
      navigation.navigate(constants.NAVIGATION_NAMES.home)
    }

    this.toggleModal()
  }

  toggleModal = () => {
    const { handleReportChatCta } = this.props
    const { isVisible } = this.state

    handleReportChatCta()
    this.setState({ isVisible: !isVisible })
  }

  render () {
    const { reportLoading } = this.props

    const { error, isVisible, success } = this.state

    return (
      <ReportChatModalComponent
        handleBackdropPress={this.handleBackdropPress}
        handleCloseClick={this.handleCloseClick}
        handlePress={this.handleSubmit}
        isVisible={isVisible}
        loading={reportLoading}
        reportError={error}
        reportSuccess={success}
      />
    )
  }
}

const mapStateToProps = state => {
  const chatId = chatIdSelector(state)
  const reportError = reportErrorSelector(state)
  const reportLoading = reportLoadingSelector(state)
  const reportSuccess = reportSuccessSelector(state)

  return {
    chatId,
    reportError,
    reportLoading,
    reportSuccess
  }
}

const mapDispatchToProps = { reportChat, resetReportChat }

const enhance = compose(
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)

export default enhance(ReportChatModal)
