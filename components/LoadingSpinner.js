import React from 'react'
import Spinner from 'react-native-spinkit'

import constants from '../constants'

const LoadingSpinner = (props) => {
  const size = props.size || 100

  return (
    <Spinner
      isVisible={true}
      size={size}
      type={'ThreeBounce'}
      color={constants.BRAND.navy}
    />
  )
}

export default LoadingSpinner
