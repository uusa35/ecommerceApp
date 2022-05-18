import {SHOW_CURRENCIES_MODAL, HIDE_CURRENCIES_MODAL} from '../actions/types';

export default function (currenciesModal = false, action) {
  switch (action.type) {
    case SHOW_CURRENCIES_MODAL:
      return true;
    case HIDE_CURRENCIES_MODAL:
      return false;
    default:
      return currenciesModal;
  }
}
