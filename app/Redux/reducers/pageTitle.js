import {SET_PAGE_TITLE} from '../actions/types';

export default function (pageTitle = 'home', action) {
  switch (action.type) {
    case SET_PAGE_TITLE:
      return action.payload;
    default:
      return pageTitle;
  }
}
