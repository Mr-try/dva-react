import dva from 'dva'
import './index.css'
import { registerModels } from './models'
import registerServiceWorker from './registerServiceWorker'

const app = dva()
app.router(require('./router').default)

registerModels(app)

app.start('#root')
registerServiceWorker()
