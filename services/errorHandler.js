import lodashGet from 'lodash/get'
import lodashIsPlainObject from 'lodash/isPlainObject'

const DEFAULT_ERROR = 'Sorry, something went wrong. Please try again.'

export function handleApiError (error) {
  let errors = lodashGet(error, 'response.data.errors')

  if (!lodashIsPlainObject(errors)) {
    errors = { default: [DEFAULT_ERROR] }
  }

  for (let field of Object.keys(errors)) {
    for (let errorString of errors[field]) {
      console.log({ field, errorString })
    }
  }

  return errors
}
