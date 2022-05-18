import {combineReducers} from 'redux';
import isLoading from './isLoading';
import isConnected from './isConnected';
import bootStrapped from './bootStrapped';
import cart from './cart';
import locale from './locale';
import searchType from './searchType';
import currency from './currency';
import settings from './settings';
import countries from './countries';
import homeSlides from './homeSlides';
import categories from './categories';
import currencies from './currencies';
import sort from './sort';
import translations from './translations';
import pageTitle from './pageTitle';
import homeProducts from './homeProducts';
import products from './products';
import product from './product';
import users from './users';
import user from './user';
import currenciesModal from './currenciesModal';
import toastMessage from './toastMessage';
import auth from './auth';
import role from './role';

let reducers = combineReducers({
  isLoading,
  isConnected,
  bootStrapped,
  cart,
  locale,
  searchType,
  currency,
  settings,
  countries,
  currencies,
  categories,
  sort,
  translations,
  pageTitle,
  homeSlides,
  homeProducts,
  products,
  product,
  users,
  user,
  currenciesModal,
  toastMessage,
  auth,
  role,
});

export default reducers;
