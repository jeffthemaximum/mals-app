import {AsyncStorage} from 'react-native'

async function get (name) {
  const value = await AsyncStorage.getItem(name)
  return value
}

async function set (name, value) {
  await AsyncStorage.setItem(name, value)
}

export default {
  get,
  set
}
