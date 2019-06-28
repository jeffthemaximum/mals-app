module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  'plugins': [
    ['transform-inline-environment-variables', {
      'include': [
        'MALS_API_HOST'
      ]
    }]
  ]
}
