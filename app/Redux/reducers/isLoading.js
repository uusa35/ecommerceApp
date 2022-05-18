import {ENABLE_LOADING, DISABLE_LOADING} from '../actions/types';

export default function (isLoading = false, action) {
  switch (action.type) {
    case ENABLE_LOADING:
      return true;
    case DISABLE_LOADING:
      return false;
    default:
      return isLoading;
  }
}
