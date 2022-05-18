import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from './../types';
import * as api from './api';
import {navigationRef} from '../../../RootNavigation';
import {isBoolean} from 'validate.js';
import Toast from 'react-native-toast-message';
import {trans} from '../../../Constants/helpers';

export function* startGetHomeProductsScenario() {
  try {
    const elements = yield call(api.getProducts, {on_home: 1});
    yield put({type: actions.SET_HOME_PRODUCTS, payload: elements});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetProductsScenario(action) {
  try {
    const {payload} = action;
    const elements = yield call(api.getProducts, payload.params);
    yield put({type: actions.SET_PRODUCTS, payload: elements});
    if (
      isBoolean(payload.redirect) &&
      payload.redirect &&
      elements.data.length > 0
    ) {
      const {locale, translations} = yield select();
      yield call(
        navigationRef.navigate('product_index', {
          title: payload.title
            ? payload.title
            : translations['product_index'][locale.lang],
        }),
      );
    } else {
      const {translations, locale} = yield select();
      yield call(
        Toast.show({
          type: 'error',
          text1: trans(translations, 'no_elements', locale.lang),
          text2: trans(translations, 'no_elements', locale.lang),
        }),
      );
    }
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetProductScenario(action) {
  try {
    const {locale} = yield select();
    const element = yield call(api.getProduct, action.payload);
    yield put({type: actions.SET_PRODUCT, payload: element}),
      yield call(
        navigationRef.navigate('product_show', {
          title: locale.isRTL ? element.name_ar : element.name_en,
          product: element,
        }),
      );
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}
