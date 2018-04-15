import { geUserData } from '../services/user'

export default {
  namespace: 'user',
  state: {
    userData: {},
  },
  effects: {
    * geUserData({}, { put, call }) {
      const data = yield call(geUserData)
      yield put({ type: 'putData', payload: { userData: data } })
    },
  },
  reducers: {
    putData(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
