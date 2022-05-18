import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from './../../actions/types';
import {
  getCategories,
  getCountries,
  getCurrencies,
  getSettings,
  getTranslations,
} from '../index';

export function* startAppBootStrap() {
  try {
    const {bootStrapped, locale} = yield select();
    yield all([
      put(getTranslations()),
      put(getSettings()),
      put(getCurrencies()),
      put(getCountries()),
      put(getCategories()),
      put({type: actions.GET_HOME_SLIDES}),
      put({type: actions.GET_HOME_PRODUCTS}),
      put({type: actions.GET_PRODUCTS}),
      // put({type: actions.GET_USERS}),
      put({type: actions.TOGGLE_BOOTSTRAPPED, payload: true}),
    ]);
  } catch (e) {
    if (__DEV__) {
      console.log('e', e);
    }
  } finally {
  }
}
