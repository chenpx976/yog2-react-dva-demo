import { hashHistory, routerRedux } from 'dva/router';
import { message } from 'antd';
import { create, remove, update, query } from '../services/users';

export default {

  namespace: 'users',

  state: {
    list: [],
    loading: false,
    total: null,
    current: 1,
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    },
  },

  effects: {
    query: function*({ payload }, { select, call, put }) {
      const route = yield select(({ routing }) => routing);
      let routerQuery = {};
      if (route && route.locationBeforeTransitions && route.locationBeforeTransitions.query) {

        routerQuery = {...route.locationBeforeTransitions.query };
      }

      if (!routerQuery.keyword) {
        delete routerQuery.keyword;
        delete routerQuery.field;
      }

      const newQuery = {
        ...routerQuery,
        page: 1,
        ...payload
      };

      yield call(hashHistory.push, {
        pathname: '/users',
        query: newQuery
      });

      yield put({ type: 'showLoading' });
      const { data } = yield call(query, newQuery);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            total: data.page.total,
            current: data.page.current
          }
        });
      }
    },
    'delete': function*({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(remove, { id: payload });
      if (data && data.success) {
        yield put({
          type: 'deleteSuccess',
          payload
        });
      }
    },
    create: function*({ payload }, { call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const { data } = yield call(create, payload);
      if (data && data.success) {
        yield put({
          type: 'createSuccess',
          payload
        });
      }
    },
    update: function*({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' });
      yield put({ type: 'showLoading' });
      const id = yield select(({ users }) => users.currentItem.id);
      const newUser = {...payload, id };
      const { data } = yield call(update, newUser);
      if (data && data.success) {
        yield put({
          type: 'updateSuccess',
          payload: newUser
        });
      }
    }
  },

  reducers: {
    showLoading(state) {
      return {...state, loading: true };
    },
    createSuccess(state, action) {
      const newUser = action.payload;
      return {...state, list: [newUser, ...state.list], loading: false };
    },
    deleteSuccess(state, action) {
      const id = action.payload;
      const newList = state.list.filter(user => user.id !== id);
      return {...state, list: newList, loading: false };
    },
    updateSuccess(state, action) {
      const updateUser = action.payload;
      const newList = state.list.map(user => {
        if (user.id === updateUser.id) {
          return {...user, ...updateUser };
        }
        return user;
      });
      return {...state, list: newList, loading: false };
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false };
    },
    showModal(state, action) {
      return {...state, ...action.payload, modalVisible: true };
    },
    hideModal(state) {
      return {...state, modalVisible: false };
    },
  }

};
