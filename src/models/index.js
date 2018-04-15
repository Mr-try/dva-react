import user from './user'
import device from './device'
import update from './update'

export function registerModels(app) {
  app.model(device)
  app.model(user)
  app.model(update)
}
