'use strict'

import React from 'react'
import lodashGet from 'lodash/get'

import constants from '../constants'
import { TextField } from './react-native-material-textfield'

const NameInputField = ({
  containerStyles = {},
  errors,
  fontSize,
  label,
  name,
  onChange,
  setRef
}) => {
  const errorString = () => {
    const nameError = lodashGet(errors, 'name.0')
    const defaultError = lodashGet(errors, 'default.0')

    if (nameError) {
      return `Name ${errors.name[0]}`
    } else if (defaultError) {
      return defaultError
    } else {
      return null
    }
  }

  const containerStyle = {
    borderColor: constants.BRAND.navy,
    margin: 0
  }

  const handleSetRef = (ref) => {
    if (setRef) {
      setRef(ref)
    }
  }

  return (
    <TextField
      affixTextStyle={{
        fontFamily: 'ProximaNova-Regular'
      }}
      baseColor={constants.BRAND.navy}
      containerStyle={[containerStyle, containerStyles]}
      error={errorString()}
      errorColor={constants.BRAND.red}
      fontSize={fontSize}
      label={label}
      labelTextStyle={{
        fontFamily: 'ProximaNova-Regular'
      }}
      onChangeText={onChange}
      ref={handleSetRef}
      textColor={constants.BRAND.navy}
      tintColor={constants.BRAND.navy}
      value={name}
    />
  )
}

export default NameInputField
