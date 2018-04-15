import { geDeviceData } from '../services/device'

export default {
  namespace: 'device',
  state: {
    deviceData: {},
  },
  subscriptions: {
  },
  effects: {
    * geDeviceData({}, { put, call }) {
      const data = yield call(geDeviceData)
      yield put({ type: 'putData', payload: { deviceData: data } })
    },
  },
  reducers: {
    putData(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
