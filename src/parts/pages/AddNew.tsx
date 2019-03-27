import React from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/breadcrumbs';
import Field from '../components/field';

function AddNew({ onAddNewPerson }: any) {

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const _data = new FormData(target).entries();
    const person = Array.from(_data)
      .reduce((memo: object, pair) => ({
        ...memo,
        [pair[0]]: pair[1]
      }), {});
    onAddNewPerson(person);
    target.reset();
  }

  return (
    <section>
      <Breadcrumbs label="Add new person" />
      <form onSubmit={handleSubmit}>
        <Field label="Name" name="firstName" />
        <Field label="Lastname" name="lastName" />
        <Field label="Phone" name="phone" />
        <button type='submit'>Add</button>
      </form>
    </section>
  );
}

export default connect(
  null,
  (dispatch) => ({
    onAddNewPerson: (user: object) => {
      dispatch({
        type: 'ADD_NEW_PERSON_ASYNC',
        payload: user
      });
    }
  })
)(AddNew);
