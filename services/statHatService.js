import axios from 'axios'

let instance = null

export default class StatHat {
  constructor (apiKey, settings) {
    if (instance) {
      return instance
    }

    const flushInterval = settings.flushInterval || 5000
    const loggerFunc = settings.loggerFunc || console.log
    const loggerEnabled = settings.loggerEnabled || false

    this.apiKey = apiKey
    this.flushInterval = flushInterval
    this.loggerEnabled = loggerEnabled
    this.loggerFunc = loggerFunc
    this.statQueue = []

    this._flushStats = this._flushStats.bind(this)
    instance = this
  }

  initiate () {
    this._logger('initiating stathat')
    setInterval(this._flushStats, this.flushInterval)
  }

  logStat (statName, { count, value }) {
    if (count) {
      this._enqueueCount(statName, count)
    } else if (value) {
      this._enqueueValue(statName, value)
    }
  }

  _enqueueCount (statName, count) {
    const statNamesInQueue = this.statQueue.map(stat => stat.stat)
    if (statNamesInQueue.includes(statName)) {
      const statIndex = statNamesInQueue.indexOf(statName)
      this.statQueue[statIndex].count += count
    } else {
      const stat = {
        stat: statName,
        count
      }
      this.statQueue.push(stat)
    }
  }

  _enqueueValue (statName, value) {
    const stat = {
      stat: statName,
      value
    }
    this.statQueue.push(stat)
  }

  _flushStats () {
    if (this.statQueue.length !== 0) {
      const data = {
        ezkey: this.apiKey,
        data: this.statQueue
      }

      this._logger(this.statQueue)

      axios
        .post('http://api.stathat.com/ez', data, {
          'Content-Type': 'application/json'
        })
        .then(res => {
          this._logger(
            `stathat response: data: ${res.data} code: ${res.status}`
          )
        })
        .catch(error => {
          this._logger(error)
        })
      this.statQueue = []
    } else {
      this._logger('empty stats')
    }
  }

  _logger () {
    if (this.loggerEnabled) {
      this.loggerFunc.apply(null, arguments)
    }
  }
}
