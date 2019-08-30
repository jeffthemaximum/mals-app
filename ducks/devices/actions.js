import * as actionTypes from './actionTypes'

export function createDevice (data) {
  // see https://www.npmjs.com/package/react-native-device-info

  // const {
  //   brand,
  //   buildId,
  //   buildNumber,
  //   bundleId,
  //   carrier,
  //   device,
  //   deviceCountry,
  //   deviceId,
  //   deviceName,
  //   fingerPrint,
  //   firstInstallTime,
  //   installReferrer,
  //   manufacturer,
  //   phoneNumber,
  //   readableVersion,
  //   serialNumber,
  //   systemVersion,
  //   timezone,
  //   uniqueId
  // } = data

  return {
    type: actionTypes.CREATE,
    data
  }
}
