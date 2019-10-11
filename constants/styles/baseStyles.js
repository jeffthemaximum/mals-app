import * as baseVariables from './baseVariables'

const BOLD_FONT_FAMILY = 'ProximaNova-Bold'
const REGULAR_FONT_FAMILY = 'ProximaNova-Regular'

export const BASE_STYLES = {
  buttons: {
    inverse: {
      fullWidth: {
        button: {
          backgroundColor: baseVariables.BRAND.white,
          borderColor: baseVariables.BRAND.navy,
          borderWidth: 2
        },
        text: {
          color: baseVariables.BRAND.navy
        }
      },
      small: {
        button: {
          alignSelf: 'center',
          backgroundColor: baseVariables.BRAND.white,
          borderColor: baseVariables.BRAND.navy,
          borderWidth: 2,
          height: 30,
          marginTop: 32,
          paddingLeft: 12,
          paddingRight: 12
        },
        text: {
          color: baseVariables.BRAND.navy,
          flex: 0,
          fontFamily: REGULAR_FONT_FAMILY,
          fontSize: 14
        }
      }
    }
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30
  },
  containerNoCenter: {
    height: '100%',
    padding: 30
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
