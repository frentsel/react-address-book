
import { cloneDeep, filter, orderBy } from 'lodash';

const initialState = {
  loader: false,
  person: null,
  people: [],
  filter: {
    match: '',
    people: []
  }
}

export default function AppReducer(state = initialState, action: { type: string, payload: any }) {

  if (action.type === 'GET_PERSON_BY_ID') {
    const _state = { ...initialState };
    _state.person = { ...action.payload };
    return _state;
  }

  if (action.type === 'GET_PEOPLE') {
    const _state: any = { ...initialState };
    _state.people = [...action.payload];
    _state.filter.people = [...action.payload];
    return _state;
  }

  if (action.type === 'ADD_NEW_PERSON') {
    return cloneDeep(state);
  }

  if (action.type === 'DELETE_PERSON') {
    return cloneDeep(state);
  }

  if (action.type === 'UPDATE_PERSON') {
    return cloneDeep(state);
  }

  if (action.type === 'LOADER') {
    const _state = cloneDeep(state);
    _state.loader = action.payload;
    return _state;
  }

  if (action.type === 'SORT') {
    const _state = cloneDeep(state);
    _state.filter.people = orderBy(_state.filter.people, ['id'], [action.payload]);
    return _state;
  }

  if (action.type === 'FILTER') {
    const _state: any = cloneDeep(state);
    _state.filter.match = action.payload;
    _state.filter.people = filter(_state.people, (o) => {
      return o.firstName.toLowerCase().indexOf(action.payload) > -1 || o.lastName.toLowerCase().indexOf(action.payload) > -1;
    });
    return _state;
  }

  return cloneDeep(state);
}
