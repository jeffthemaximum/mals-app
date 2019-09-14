import { NavigationActions } from 'react-navigation'

let _navigator

function navigate (routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function setTopLevelNavigator (navigatorRef) {
  _navigator = navigatorRef
}

export default {
  navigate,
  setTopLevelNavigator
}
