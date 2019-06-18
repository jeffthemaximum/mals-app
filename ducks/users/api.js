import axios from 'axios'

const API_HOST = process.env['MALS_API_HOST']

async function getOrCreateUser (jwt) {
  const requestConfig = {
    method: 'post',
    params: {},
    url: `${API_HOST}/users/get_or_create`
  }

  try {
    const user = await axios.request(requestConfig)
  } catch (e) {
    console.log(e)
    return { error: e }
  }
}

export default (
  getOrCreateUser
)
