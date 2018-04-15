import { agent } from '../utils'

export const geDeviceData = () => {
  return agent({ url: '/api/device' })
    .then((data) => {
      return data
    })
}

