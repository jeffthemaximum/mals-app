'use strict'

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'

import Button from './Button'
import constants from '../constants'

const EulaModal = ({ isVisible, handlePress, loading }) => {
  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View style={styles.content}>
          <Text style={styles.header}>End User License Agreement</Text>
          <Text style={styles.text}>{constants.EULA_COPY}</Text>
          <Button handlePress={handlePress} isLoading={loading} text='Accept' />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: constants.BASE_STYLES.modal.container,
  content: constants.BASE_STYLES.modal.content,
  header: {
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center'
  },
  text: {
    fontFamily: constants.BASE_STYLES.fonts.regularFontFamily,
    marginBottom: 24
  }
})

// without react-native-modal
//
// const width = Dimensions.get('window').width
//
// const EulaModal = ({ isVisible, handlePress, loading }) => {
//   return (
//     <View>
//       <Modal visible={isVisible} transparent animationType={'fade'}>
//         <View style={styles.wrapper}>
//           <View style={styles.content}>
//             <Text style={styles.header}>End User License Agreement</Text>
//             <Text style={styles.text}>{constants.EULA_COPY}</Text>
//             <Button
//               handlePress={handlePress}
//               isLoading={loading}
//               text='Accept'
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   content: {
//     backgroundColor: '#fff',
//     width: width * 0.9,
//     padding: 24,
//     borderRadius: 4
//   },
//   header: {
//     fontSize: 18,
//     marginBottom: 12,
//     textAlign: 'center'
//   },
//   text: {
//     marginBottom: 24
//   },
//   wrapper: {
//     backgroundColor: '#00000080',
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }
// })

export default EulaModal
