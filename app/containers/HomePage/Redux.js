import { createActions, createReducer } from 'reduxsauce';
import { fromJS } from 'immutable';

export const INITIAL_STATE = fromJS({
  fetching: false,
});

const { Types, Creators } = createActions({
  fetchUserRequest: null,
  fetchUserSuccess: ['payload'],
  fetchUserFailure: ['error'],
});

export default Creators;
export const userTypes = Types;

export const fetchUserRequest = state =>
  state.merge({
    fetching: true,
  });
export const fetchUserSuccess = (state, { payload }) =>
  state.merge({
    fetching: false,
    payload,
  });
export const fetchUserFailure = (state, { error }) =>
  state.merge({
    fetching: false,
    error,
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_USER_REQUEST]: fetchUserRequest,
  [Types.FETCH_USER_FAILURE]: fetchUserFailure,
  [Types.FETCH_USER_SUCCESS]: fetchUserSuccess,
});
