'use strict'

import { connect } from 'react-redux'
import React, { Component } from 'react'

import menu from '../ducks/menu'
import MenuComponent from '../components/Menu'

const {
  actions: { toggleMenu },
  selectors: { isOpen: menuIsOpenSelector }
} = menu

class Menu extends Component {
  render () {
    return <MenuComponent />
  }
}

const mapStateToProps = state => {
  const menuIsOpen = menuIsOpenSelector(state)

  return {
    menuIsOpen
  }
}

const mapDispatchToProps = { toggleMenu }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu)
