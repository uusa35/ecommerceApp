import * as actions from './../actions/types';

export const startBootStrap = () => ({
  type: actions.START_BOOTSTRAPPED,
});

export const toggleBootStrap = payload => ({
  type: actions.TOGGLE_BOOTSTRAPPED,
  payload,
});

// cart

export const addToCart = payload => ({
  type: actions.ADD_TO_CART,
  payload,
});

export const checkCartBeforeAdd = payload => ({
  type: actions.CHECK_CART_BEFORE_ADD,
  payload,
});

export const prepareCart = payload => ({
  type: actions.PREPARE_CART,
  payload,
});

export const setShipmentFees = payload => ({
  type: actions.SET_SHIPMENT_FEES,
  payload,
});

export const enableDirectPurchaseMode = payload => ({
  type: actions.ENABLE_DIRECT_PURCHASE_MODE,
  payload,
});

export const removeFromCart = payload => ({
  type: actions.REMOVE_FROM_CART,
  payload,
});

export const clearCart = payload => ({
  type: actions.CLEAR_CART,
  payload,
});

export const toggleLang = () => ({
  type: actions.TOGGLE_LANG,
});

// settings

export const setSettings = payload => ({
  type: actions.SET_SETTINGS,
  payload,
});

export const startBootStrapped = payload => ({
  type: actions.START_BOOTSTRAPPED,
  payload,
});

export const disableBootStrapped = () => ({
  type: actions.DISABLE_BOOTSTRAPPED,
});

export const setCurrency = payload => ({
  type: actions.SET_CURRENCY,
  payload,
});

export const getSettings = () => ({
  type: actions.GET_SETTINGS,
});

export const getCurrencies = () => ({
  type: actions.GET_CURRENCIES,
});

export const getCategories = () => ({
  type: actions.GET_CATEGORIES,
});

export const getCountries = () => ({
  type: actions.GET_COUNTRIES,
});

export const setModules = payload => ({
  type: actions.SET_MODULES,
  payload,
});

export const toggleSort = payload => ({
  type: actions.TOGGLE_SORT,
  payload,
});

export const showModal = payload => ({
  type: actions.SHOW_MODAL,
  payload,
});

export const hideModal = () => ({
  type: actions.HIDE_MODAL,
});

export const setParentModule = payload => ({
  type: actions.SET_PARENT_MODULE,
  payload,
});

export const setBreadCrumbs = payload => ({
  type: actions.SET_BREADCRUMBS,
  payload,
});

export const resetBreadCrumbs = () => ({
  type: actions.RESET_BREADCRUMBS,
});

export const setCurrentFormTab = payload => ({
  type: actions.SET_CURRENT_FORM_TAB,
  payload,
});

export const showToastMessage = payload => ({
  type: actions.SET_TOAST_MESSAGE,
  payload,
});

export const hideToastMessage = () => ({
  type: actions.CLEAR_TOAST_MESSAGE,
});

export const setAuth = payload => ({
  type: actions.SET_AUTH,
  payload,
});

export const setDiscount = payload => ({
  type: actions.SET_DISCOUNT,
  payload,
});

export const setSearchType = payload => ({
  type: actions.SET_SEARCH_TYPE,
  payload,
});

export const setTheme = payload => ({
  type: actions.SET_THEME,
  payload,
});

export const setTranslations = payload => ({
  type: actions.SET_TRANSLATIONS,
  payload,
});

export const getTranslations = () => ({
  type: actions.GET_TRANSLATIONS,
});

export const setPageTitle = payload => ({
  type: actions.SET_PAGE_TITLE,
  payload,
});

export const setShowCartIcon = payload => ({
  type: actions.SET_SHOW_CART_ICON,
  payload,
});

export const setShowNightModeIcon = payload => ({
  type: actions.SET_SHOW_NIGHT_MODE,
  payload,
});

export const showCurrenciesModal = () => ({
  type: actions.SHOW_CURRENCIES_MODAL,
});

export const hideCurrenciesModal = () => ({
  type: actions.HIDE_CURRENCIES_MODAL,
});

export const getProducts = payload => ({
  type: actions.GET_PRODUCTS,
  payload,
});

export const getProduct = payload => ({
  type: actions.GET_PRODUCT,
  payload,
});

export const getUsers = payload => ({
  type: actions.GET_USERS,
  payload,
});

export const getSearchUsers = payload => ({
  type: actions.GET_SEARCH_USERS,
  payload,
});

export const getUser = payload => ({
  type: actions.GET_USER,
  payload,
});

export const getAuth = payload => ({
  type: actions.GET_AUTH,
  payload,
});

export const logout = payload => ({
  type: actions.START_LOGOUT,
  payload,
});
