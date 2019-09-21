import AsyncStorage from '@react-native-community/async-storage'

export async function clear () {
  await AsyncStorage.clear()
}

export async function get (name) {
  const value = await AsyncStorage.getItem(name)
  return value
}

export async function set (name, value) {
  await AsyncStorage.setItem(name, value)
}
