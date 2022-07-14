import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as ActionCreators from '../actions/actionCreator';
import * as AuthApi from '../api/rest/auth';
import * as restController from '../api/rest/restController';
import { controller } from '../api/ws/socketController';

export function * loginSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    const {data: {user}} = yield AuthApi.loginRequest(action.data);
    controller.subscribe(user.id);
    yield put(ActionCreators.authActionSuccess(user));
  } catch (err) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: err.response });
  }
}

export function * registerSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    const {data: {user}} = yield AuthApi.registerRequest(action.data);
    controller.subscribe(user.id);
    yield put(ActionCreators.authActionSuccess(user));
  } catch (e) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: e.response });
  }
}

export function * refreshSaga (action) {
  yield put({ type: ACTION.AUTH_ACTION_REQUEST });
  try {
    const {data: {user}} = yield AuthApi.refresh(action.data);
    controller.subscribe(user.id);
    yield put(ActionCreators.authActionSuccess(user));
  } catch (error) {
    yield put({ type: ACTION.AUTH_ACTION_ERROR, error: error.response });
  }
}



export function * updateUserData (action) {
  try {
    const { data } = yield restController.updateUser(action.data);
    yield put({ type: ACTION.UPDATE_USER_DATA_SUCCESS, data });
    yield put({ type: ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE, data: false });
  } catch (e) {
    yield put({ type: ACTION.UPDATE_USER_DATA_ERROR, error: e.response });
  }
}
