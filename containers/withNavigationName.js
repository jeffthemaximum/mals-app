'use strict'

import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import navigation from '../ducks/navigation'
import { withNavigation } from 'react-navigation'

const {
  actions: { setName, unsetName },
  selectors: { name: navigationNameSelector }
} = navigation

function withNavigationName (componentName) {
  return (WrappedComponent) => {
    class WrapperComponent extends Component {
      componentDidMount () {
        // TODO this can likely be removed once Chat container is reworked
        this.handleFocus()

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

      handleBlur = () => {
        const { unsetName } = this.props

        unsetName()
      }

      handleFocus = () => {
        const { navigationName, setName } = this.props

        if (componentName && componentName !== navigationName) {
          setName(componentName)
        }
      }

      componentWillUnmount () {
        this.handleBlur()
        this.didBlurSubscription && this.didBlurSubscription.remove()
        this.didFocusSubscription && this.didFocusSubscription.remove()
      }

      render () {
        return (
          <WrappedComponent {...this.props} />
        )
      }
    }

    const mapStateToProps = state => {
      const navigationName = navigationNameSelector(state)

      return {
        navigationName
      }
    }

    const mapDispatchToProps = {
      setName,
      unsetName
    }

    const enhance = compose(
      withNavigation,
      connect(mapStateToProps, mapDispatchToProps)
    )

    return enhance(WrapperComponent)
  }
}

export default withNavigationName
