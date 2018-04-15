import { agent } from '../utils'

export const geUserData = () => {
  return agent({ url: '/api/user' })
    .then((data) => {
      return data
    })
}

