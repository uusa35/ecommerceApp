import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from './../types';
import * as api from './api';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../../../RootNavigation';
import {SET_PAGE_TITLE} from './../types';
import Toast from 'react-native-toast-message';

export function* startChangeLangScenario(action) {
  try {
    const isRTL = action.payload === 'ar';
    if (action.payload === 'ar') {
      yield put({
        type: actions.SET_LOCALE,
        payload: {
          isRTL,
          dir: 'rtl',
          otherLang: 'en',
        },
      });
    } else {
      yield put({
        type: actions.SET_LOCALE,
        payload: {
          isRTL,
          dir: 'ltr',
          otherLang: 'ar',
        },
      });
    }
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetTranslationsScenario() {
  try {
    const translations = yield call(api.getTranslations);
    yield put({type: actions.SET_TRANSLATIONS, payload: translations});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetSettingsScenario() {
  try {
    const elements = yield call(api.getSettings);
    yield put({type: actions.SET_SETTINGS, payload: elements});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetCurrenciesScenario() {
  try {
    const elements = yield call(api.getCurrencies);
    yield put({type: actions.SET_CURRENCIES, payload: elements});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetCountriesScenario() {
  try {
    const elements = yield call(api.getCountries);
    yield put({type: actions.SET_COUNTRIES, payload: elements});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetCategoriesScenario() {
  try {
    const elements = yield call(api.getCateogries);
    yield put({type: actions.SET_CATEGORIES, payload: elements});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startGetHomeSlides() {
  try {
    const elements = yield call(api.getHomeSlides);
    yield put({type: actions.SET_HOME_SLIDES, payload: elements});
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startSetToastMessageScenario(action) {
  try {
    const {payload} = action;
    Toast.show({
      type: payload.type,
      text1: payload.title,
      text2: payload.content,
    });
    // yield delay(3000)
    // yield put({ type : actions.HIDE_TOAST_MESSAGE})
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}

export function* startToggleLangScenario() {
  try {
    const {locale} = yield select();
    yield put({
      type: actions.SET_LOCALE,
      payload: {
        lang: locale.lang === 'ar' ? 'en' : 'ar',
        isRTL: locale.lang === 'ar' ? false : true,
        dir: locale.lang === 'ar' ? 'ltr' : 'rtl',
        otherLang: locale.lang,
        trans: (t, n, l) => t[n][l],
      },
    });
    I18nManager.forceRTL(locale.lang === 'ar' ? false : true);
    yield delay(200);
    yield call(RNRestart.Restart());
  } catch (e) {
    console.log('e', e);
  } finally {
  }
}
