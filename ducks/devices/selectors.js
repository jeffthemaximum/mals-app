import lodashGet from 'lodash/get'

export const device = state => state.devices.device
export const deviceUniqueId = state => lodashGet(state.devices, `device.uniqueId`)
export const error = state => state.devices.error
export const hasAcceptedEula = state => lodashGet(state.devices, `device.hasAcceptedEula`)
export const loading = state => state.devices.loading
