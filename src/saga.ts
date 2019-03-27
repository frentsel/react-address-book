import { put, call, takeEvery, all } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import axios from 'axios';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const interceptor = (fn: any) => function* () {
  yield put({ type: 'LOADER', payload: true });
  try {
    yield fn.apply(fn, arguments);
  } catch (error) {
    toastr.error('Error', error.message);
  }
  yield put({ type: 'LOADER', payload: false });
}

export function* getAllPeople() {
  const { data } = yield call(axios.get, '//localhost:3000/people');
  yield delay(200);
  yield put({ type: 'GET_PEOPLE', payload: data });
}

export function* watchGetPeople() {
  yield takeEvery('GET_PEOPLE_ASYNC', interceptor(getAllPeople));
}

export function* getPersonById({ payload }: { payload: string }) {
  const { data } = yield call(axios.get, '//localhost:3000/people/' + payload);
  yield delay(200);
  yield put({ type: 'GET_PERSON_BY_ID', payload: data });
}

export function* watchGetPersonById() {
  yield takeEvery('GET_PERSON_BY_ID_ASYNC', interceptor(getPersonById));
}

export function* addNewPerson({ payload }: { payload: object }) {
  const { data } = yield call(axios.post, '//localhost:3000/people', payload);
  yield delay(200);
  yield put({ type: 'ADD_NEW_PERSON', payload: data });
  yield toastr.success('Success', 'The user has been successfully added!');
}

export function* watchAddNewPerson() {
  yield takeEvery('ADD_NEW_PERSON_ASYNC', interceptor(addNewPerson));
}

export function* deletePerson({ payload }: { payload: { id: number } }) {
  yield call(axios.delete, '//localhost:3000/people/' + payload.id);
  yield delay(200);
  yield put({ type: 'DELETE_PERSON', payload });
  yield put({ type: 'GET_PEOPLE_ASYNC', payload });
  yield toastr.info('Info', 'The user has been deleted from the system!');
}

export function* watchDeletePerson() {
  yield takeEvery('DELETE_PERSON_ASYNC', interceptor(deletePerson));
}

export function* updatePerson({ payload }: { payload: { id: number } }) {
  const { data } = yield call(axios.put, '//localhost:3000/people/' + payload.id, payload);
  yield delay(200);
  yield put({ type: 'UPDATE_PERSON', payload: data });
  yield toastr.info('Info', 'The user info has been updated!');
}

export function* watchUpdatePerson() {
  yield takeEvery('UPDATE_PERSON_ASYNC', interceptor(updatePerson));
}

export default function* rootSaga() {
  yield all([
    watchGetPeople(),
    watchGetPersonById(),
    watchAddNewPerson(),
    watchDeletePerson(),
    watchUpdatePerson(),
  ])
}