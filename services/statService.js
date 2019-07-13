import constants from '../constants'
import StatHat from './statHatService'

const statHat = new StatHat(constants.STAHAT_API_KEY, { loggerEnabled: true })
statHat.initiate()

export const log = (statName, data) => {
  if (!statName) {
    console.log(`Missing statName; data: ${data}`)
    return
  }

  if (!data.count && !data.value) {
    console.log(`Missing data; data: ${data}, statName: ${statName}`)
    return
  }

  statName = `mals_app/${constants.ENV_NAME}/${statName}`

  statHat.logStat(statName, data)
}
