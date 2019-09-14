import * as baseVariables from './baseVariables'

export const BASE_STYLES = {
  container: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  fonts: {
    boldFontFamily: 'ProximaNova-Bold',
    regularFontFamily: 'ProximaNova-Regular'
  },
  modal: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: baseVariables.BRAND.white
    },
    content: {
      backgroundColor: baseVariables.BRAND.white,
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)'
    },
  }
}
