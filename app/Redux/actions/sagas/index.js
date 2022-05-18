import {fork, take, all} from 'redux-saga/effects';
import * as triggers from './triggers';
import {REHYDRATE, PURGE} from 'redux-persist/lib/constants';

export default function* rootSaga() {
  yield all([
    fork(triggers.triggerAppBootstrap),
    fork(triggers.triggerGetTranslations),
    fork(triggers.triggerGetSettings),
    fork(triggers.triggerToggleLang),
    fork(triggers.triggerGetCurrencies),
    fork(triggers.triggerGetCountries),
    fork(triggers.triggerGetCategories),
    fork(triggers.triggerGetHomeSlides),
    fork(triggers.triggerGetHomeProducts),
    fork(triggers.triggerGetProducts),
    fork(triggers.triggerGetProduct),
    fork(triggers.triggerGetSearchUsers),
    fork(triggers.triggerGetUsers),
    fork(triggers.triggerGetUser),
    fork(triggers.triggerSetToastMessage),
    // cart
    fork(triggers.triggerCheckCartBeforeAdd),
    fork(triggers.triggerAddToCart),
    fork(triggers.triggerEnableDirectPurchaseModel),
    fork(triggers.triggerRemoveFromCart),
    fork(triggers.triggerClearCart),
    // auth
    fork(triggers.triggerGetAuth),
    fork(triggers.triggerLogout),
  ]);
  yield take(REHYDRATE); // Wait for rehydrate to prevent sagas from running with empty store
  yield take(PURGE);
}
