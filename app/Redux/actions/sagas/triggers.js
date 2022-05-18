import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from '../types';
import {startAppBootStrap} from './appSaga';
import * as requestSaga from './requestSaga';
import * as productSagas from './productSagas';
import * as userSagas from './userSagas';
import * as cartSaga from './cartSaga';

export function* triggerAppBootstrap() {
  yield takeLatest(actions.START_BOOTSTRAPPED, startAppBootStrap);
}

export function* triggerGetTranslations() {
  yield takeLatest(
    actions.GET_TRANSLATIONS,
    requestSaga.startGetTranslationsScenario,
  );
}

export function* triggerGetSettings() {
  yield takeLatest(actions.GET_SETTINGS, requestSaga.startGetSettingsScenario);
}

export function* triggerToggleLang() {
  yield takeLatest(actions.TOGGLE_LANG, requestSaga.startToggleLangScenario);
}

export function* triggerGetCurrencies() {
  yield takeLatest(
    actions.GET_CURRENCIES,
    requestSaga.startGetCurrenciesScenario,
  );
}

export function* triggerGetCountries() {
  yield takeLatest(
    actions.GET_COUNTRIES,
    requestSaga.startGetCountriesScenario,
  );
}

export function* triggerGetCategories() {
  yield takeLatest(
    actions.GET_CATEGORIES,
    requestSaga.startGetCategoriesScenario,
  );
}

export function* triggerGetHomeSlides() {
  yield takeLatest(actions.GET_HOME_SLIDES, requestSaga.startGetHomeSlides);
}

export function* triggerGetHomeProducts() {
  yield takeLatest(
    actions.GET_HOME_PRODUCTS,
    productSagas.startGetHomeProductsScenario,
  );
}

export function* triggerGetProducts() {
  yield takeLatest(actions.GET_PRODUCTS, productSagas.startGetProductsScenario);
}
export function* triggerGetProduct() {
  yield takeLatest(actions.GET_PRODUCT, productSagas.startGetProductScenario);
}

export function* triggerGetSearchUsers() {
  yield takeLatest(
    actions.GET_SEARCH_USERS,
    userSagas.startGetSearchUsersScenario,
  );
}

export function* triggerGetUsers() {
  yield takeLatest(actions.GET_USERS, userSagas.startGetUsersScenario);
}

export function* triggerGetUser() {
  yield takeLatest(actions.GET_USER, userSagas.startGetUserScenario);
}

export function* triggerSetToastMessage() {
  yield takeLatest(
    actions.SHOW_TOAST_MESSAGE,
    requestSaga.startSetToastMessageScenario,
  );
}

// cart

export function* triggerAddToCart() {
  yield takeLatest(actions.ADD_TO_CART, cartSaga.startAddToCartScenario);
}

export function* triggerCheckCartBeforeAdd() {
  yield takeLatest(
    actions.CHECK_CART_BEFORE_ADD,
    cartSaga.startCheckCartBeforeAdd,
  );
}

export function* triggerEnableDirectPurchaseModel() {
  yield takeLatest(
    actions.ENABLE_DIRECT_PURCHASE_MODE,
    cartSaga.startEnableDirectPurchaseModelScenario,
  );
}

export function* triggerRemoveFromCart() {
  yield takeLatest(
    actions.REMOVE_FROM_CART,
    cartSaga.startRemoveFromCartScenario,
  );
}

export function* triggerClearCart() {
  yield takeLatest(actions.CLEAR_CART, cartSaga.startClearCartScenario);
}

//auth
export function* triggerGetAuth() {
  yield takeLatest(actions.GET_AUTH, userSagas.startGetAuthScenario);
}

export function* triggerLogout() {
  yield takeLatest(actions.START_LOGOUT, userSagas.startLogoutScenario);
}
