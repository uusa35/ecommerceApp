import {SET_USERS} from '../actions/types';

export default function (users = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return users;
  }
}
