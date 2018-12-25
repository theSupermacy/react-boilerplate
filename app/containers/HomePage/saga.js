import { call, put, takeLatest } from 'redux-saga/effects';
import UserService from '../../services/userInformation';
import { userTypes, fetchUserSuccess, fetchUserFailure } from './Redux';

export function* getInformation() {
  const userService = new UserService();
  const response = yield call([userService, 'fetchAllUserData']);
  if (response.ok) {
    yield put(fetchUserSuccess(response.data));
  } else yield put(fetchUserFailure(response.error));
}

export default function* index() {
  yield takeLatest(userTypes.FETCH_USER_REQUEST, getInformation);
}
