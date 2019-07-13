let config = {}

try {
  config = require('./config.local').config
} catch (e) {
  if (e.message && e.message.includes('Cannot find module')) {
    console.log('No local config file to load, using environment variables.')
  } else {
    console.log('Local config error:', e)
  }
}

export { config }
