import { create, remove, update, query } from '../services/products';

export default {
  namespace: 'products',
  state: {
    list: [],
    loading: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' });
    }
  },
  effects: {
    query: function*(_, { put, call }) {
      const { data } = yield call(query);
      console.log(data);
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: data.data
        });
      }
    },
    vote: function*({ payload }, { select, put, call }) {
      const { data } = yield call(update, { id: payload });
      if (data && data.success) {
        yield put({
          type: 'voteSucess',
          payload,
        });
      }
    }
  },
  reducers: {
    query(state) {
      return {...state, loading: true };
    },
    querySuccess(state, { payload }) {
      console.log(123);
      return {...state, loading: false, list: payload };
    },
    vote(state) {
      return {...state, loading: true };
    }
  }
};
