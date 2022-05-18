import {appName} from './Constants';

export const isLocal = true;
export const env = __DEV__;
export const productionUrl = () => {
  switch (appName) {
    case 'istores':
      return 'http://beta.i-stores.store/';
    case 'demo':
      return 'http://demo.iads-kw.com/';
    case 'ecommerce':
      return 'http://ecommerce.iads-kw.com/';
    case 'grc':
      return 'http://grcshare.com/';
    default:
      return 'http://beta.i-stores.store/';
  }
};

export const localUrl = () => {
  switch (appName) {
    case 'istores':
      return 'http://beta.i-stores.store/';
    case 'demo':
      return 'http://demo.iads-kw.com/';
    case 'ecommerce':
      return 'http://ecommerce.iads-kw.com/';
    case 'grc':
      return 'http://grcshare.com/';
    case 'local':
      return 'http://ecommerce-backend.test/';
    default:
      return 'http://beta.i-stores.store/';
  }
};
export const appUrl = isLocal ? localUrl() : productionUrl();
export const apiUrl = isLocal ? `${localUrl()}api/` : `${productionUrl()}api/`;
