import { getUpdateData } from '../services/update'

export default {
  namespace: 'update',
  state: {
    updateData: {},
  },
  effects: {
    * getUpdateData({}, { put, call }) {
      const data = yield call(getUpdateData)
      yield put({ type: 'putData', payload: { updateData: data } })
    },
  },
  reducers: {
    putData(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
