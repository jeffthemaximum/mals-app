import DeviceInfo from 'react-native-device-info'

export const getInfo = () => {
  return {
    brand: DeviceInfo.getBrand(),
    buildId: DeviceInfo.getBuildId(),
    buildNumber: DeviceInfo.getBuildNumber(),
    bundleId: DeviceInfo.getBundleId(),
    carrier: DeviceInfo.getCarrier(),
    device: DeviceInfo.getDevice(),
    deviceCountry: DeviceInfo.getDeviceCountry(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceName: DeviceInfo.getDeviceName(),
    fingerPrint: DeviceInfo.getFingerprint(),
    firstInstallTime: DeviceInfo.getFirstInstallTime(),
    installReferrer: DeviceInfo.getInstallReferrer(),
    manufacturer: DeviceInfo.getManufacturer(),
    phoneNumber: DeviceInfo.getPhoneNumber(),
    readableVersion: DeviceInfo.getReadableVersion(),
    serialNumber: DeviceInfo.getSerialNumber(),
    systemVersion: DeviceInfo.getSystemVersion(),
    timezone: DeviceInfo.getTimezone(),
    uniqueId: DeviceInfo.getUniqueID()
  }
}
