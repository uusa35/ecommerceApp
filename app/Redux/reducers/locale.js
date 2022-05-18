import {SET_LOCALE} from '../actions/types';

const initialState = {isRTL: false, dir: 'ltr', otherLang: 'ar', lang: 'en'};
export default function (locale = initialState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return action.payload;
    default:
      return locale;
  }
}
