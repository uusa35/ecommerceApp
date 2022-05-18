import {SET_HOME_SLIDES} from '../actions/types';

export default function (homeSlides = [], action) {
  switch (action.type) {
    case SET_HOME_SLIDES:
      return action.payload;
    default:
      return homeSlides;
  }
}
