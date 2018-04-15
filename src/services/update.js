import { agent } from '../utils'

export const getUpdateData = () => {
  return agent({ url: '/api/update' })
    .then((data) => {
      return data
    })
}

