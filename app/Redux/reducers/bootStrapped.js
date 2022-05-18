import {
  DISABLE_BOOTSTRAPPED,
  START_BOOTSTRAPPED,
  TOGGLE_BOOTSTRAPPED,
} from '../actions/types';

export default function (bootStrapped = false, action) {
  switch (action.type) {
    case TOGGLE_BOOTSTRAPPED:
      return action.payload;
    case START_BOOTSTRAPPED:
      return false;
    case DISABLE_BOOTSTRAPPED:
      return true;
    default:
      return bootStrapped;
  }
}
