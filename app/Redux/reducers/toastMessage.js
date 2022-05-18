import {SHOW_TOAST_MESSAGE, HIDE_TOAST_MESSAGE} from '../actions/types';

const initialState = {title: '', content: '', type: 'info', show: false};
export default function (toastMessage = initialState, action) {
  switch (action.type) {
    case SHOW_TOAST_MESSAGE:
      return {
        ...action.payload,
        show: true,
      };
    case HIDE_TOAST_MESSAGE:
      return {
        ...initialState,
        show: false,
      };
    default:
      return toastMessage;
  }
}
