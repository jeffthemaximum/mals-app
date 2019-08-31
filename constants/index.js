import apiConstants from './api'
import copyConstants from './copy'
import deviceConstants from './devices'
import humaaansConstants from './humaaans'
import notificationConstants from './notifications'
import stylesConstants from './styles'
import usersConstants from './users'

export default {
  ...apiConstants,
  ...copyConstants,
  ...deviceConstants,
  ...humaaansConstants,
  ...notificationConstants,
  ...stylesConstants,
  ...usersConstants
}
