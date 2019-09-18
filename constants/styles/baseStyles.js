import * as baseVariables from './baseVariables'

const BOLD_FONT_FAMILY = 'ProximaNova-Bold'
const REGULAR_FONT_FAMILY = 'ProximaNova-Regular'

export const BASE_STYLES = {
  container: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  fonts: {
    boldFontFamily: BOLD_FONT_FAMILY,
    regularFontFamily: REGULAR_FONT_FAMILY
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
    header: {
      fontFamily: REGULAR_FONT_FAMILY,
      fontSize: 18,
      marginBottom: 12,
      textAlign: 'center'
    },
    text: {
      fontFamily: REGULAR_FONT_FAMILY,
      marginBottom: 24
    }
  }
}
