import React, { Component } from 'react';
import { connect } from 'react-redux';
import Breadcrumbs from '../components/breadcrumbs';
import Field from '../components/field';
import { get, merge } from 'lodash';

class User extends Component<any> {

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.onGetPersonById(id);
  }

  handleSubmit(e: React.SyntheticEvent): void {
    e.preventDefault();
    const person = merge(this.props.state.person, this.state);
    this.props.onUpdatePerson(person);
  }

  render() {
    return (
      <section>
        <Breadcrumbs label="Edit User" />
        <Form onFormSubmit={this.handleSubmit.bind(this)} person={this.props.state.person} />
      </section>
    );
  }
}


function Form({ person, onFormSubmit }: { person: any, onFormSubmit: React.FormEventHandler }) {

  const handleChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLFormElement;
    person[name] = value;
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Field label="Name" name="firstName" defaultValue={get(person, 'firstName', '')} onChange={handleChange} />
      <Field label="Lastname" name="lastName" defaultValue={get(person, 'lastName', '')} onChange={handleChange} />
      <Field label="Phone" name="phone" defaultValue={get(person, 'phone', '')} onChange={handleChange} />
      <button type='submit'>Save</button>
    </form>
  );
}

export default connect(
  (state: { app: object }) => ({ state: state.app }),
  (dispatch) => ({
    onGetPersonById: (id: number) => {
      dispatch({
        type: 'GET_PERSON_BY_ID_ASYNC',
        payload: id
      });
    },
    onUpdatePerson: (person: object) => {
      dispatch({
        type: 'UPDATE_PERSON_ASYNC',
        payload: person
      });
    }
  })
)(User);
