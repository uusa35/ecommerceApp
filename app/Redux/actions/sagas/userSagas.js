import {
  call,
  put,
  all,
  takeLatest,
  select,
  delay,
  getContext,
} from 'redux-saga/effects';
import * as actions from './../types';
import * as api from './api';
import {navigationRef} from '../../../RootNavigation';
import {isArray, isBoolean, isEmpty} from 'validate.js';
import {trans} from '../../../Constants/helpers';
import {DISABLE_LOADING} from './../types';

export function* startGetUsersScenario(action) {
  try {
    const {payload} = action;
    const {translations, locale} = yield select();
    console.log('params', payload?.params);
    const elements = yield call(api.getUsers, payload?.params);
    if (
      elements &&
      elements.data &&
      !isEmpty(elements.data) &&
      elements.data.length > 0
    ) {
      yield all([
        put({type: actions.ENABLE_LOADING}),
        put({type: actions.SET_USERS, payload: elements}),
      ]);
      yield call(
        navigationRef.navigate('user_index', {
          title: payload.title
            ? payload.title
            : translations['user_index'][locale.lang],
        }),
      );
    } else {
      yield put({
        type: actions.SHOW_TOAST_MESSAGE,
        payload: {
          type: 'error',
          title: trans(translations, 'no_elements', locale.lang),
          content: trans(translations, 'no_elements', locale.lang),
        },
      });
    }
  } catch (e) {
  } finally {
    yield put({type: DISABLE_LOADING});
  }
}

export function* startGetSearchUsersScenario(action) {
  try {
    const {payload} = action;
    const {translations, locale} = yield select();
    const elements = yield call(api.getUsers, payload.params);
    if (
      elements &&
      elements.data &&
      !isEmpty(elements.data) &&
      elements.data.length > 0
    ) {
      yield all([
        put({type: actions.ENABLE_LOADING}),
        call(
          navigationRef.navigate('user_search', {
            title: payload.title
              ? payload.title
              : translations['user_search'][locale.lang],
            params: payload.params,
            elements,
          }),
        ),
      ]);
    } else {
      yield put({
        type: actions.SHOW_TOAST_MESSAGE,
        payload: {
          type: 'error',
          title: trans(translations, 'no_elements', locale.lang),
          content: trans(translations, 'no_elements', locale.lang),
        },
      });
    }
    // params + redirect + title
  } catch (e) {
    console.log('error getSearchUsers', e);
  } finally {
    yield put({type: DISABLE_LOADING});
  }
}

export function* startGetUserScenario(action) {
  try {
    const {locale} = yield select();
    const element = yield call(api.getUser, action.payload);
    yield put({type: actions.SET_USER, payload: element});
    yield call(
      navigationRef.navigate('user_show', {
        title: locale.isRTL ? element.element.name_ar : element.element.name_en,
      }),
    );
    yield call({type: actions.DISABLE_LOADING});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetAuthScenario(action) {
  try {
    const {translations, locale} = yield select();
    const element = yield call(api.postLogin, action.payload);
    if (!isEmpty(element) && element && element.id) {
      yield put({
        type: actions.SHOW_TOAST_MESSAGE,
        payload: {
          type: 'success',
          title: trans(translations, 'success', locale.lang),
          content: trans(translations, 'process_success', locale.lang),
        },
      });
      yield all([
        put({type: actions.SET_AUTH, payload: element}),
        put({type: actions.SET_ROLE, payload: element.role}),
      ]);
      yield call(navigationRef.navigate('home'));
    } else {
      yield all([
        put({type: actions.SET_AUTH, payload: []}),
        put({type: actions.SET_ROLE, payload: []}),
      ]);
      yield put({
        type: actions.SHOW_TOAST_MESSAGE,
        payload: {
          type: 'error',
          title: trans(translations, 'error', locale.lang),
          content: element,
        },
      });
    }
    yield call({type: actions.DISABLE_LOADING});
  } catch (e) {
  } finally {
  }
}

export function* startLogoutScenario() {
  try {
    const {translations, locale} = yield select();
    yield put({
      type: actions.SHOW_TOAST_MESSAGE,
      payload: {
        type: 'info',
        title: trans(translations, 'success', locale.lang),
        content: trans(translations, 'process_success', locale.lang),
      },
    });
    yield all([
      put({type: actions.SET_AUTH, payload: []}),
      put({type: actions.SET_ROLE, payload: []}),
    ]);
    yield call(navigationRef.navigate('home'));
  } catch (e) {
    console.log('logout', e);
  }
}
