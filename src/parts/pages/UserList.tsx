import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

class UserList extends Component<any> {

  componentDidMount() {
    this.props.onGetAll();
  }

  render() {
    const { onFilter, onSort, onDeletePerson, state } = this.props;
    return (
      <section>
        <Breadcrumbs label="User list" />
        <input type='text' placeholder='Enter name or lastname' onChange={onFilter} />
        <select onChange={onSort}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <List data={state.filter.people} onDeletePerson={onDeletePerson} />
      </section>
    );
  }
}

function List({ data, onDeletePerson }: any) {
  const onDelete = (person: object) => {
    const status: boolean = confirm('Are you sure about that!');
    if (status) onDeletePerson(person);
  }
  return (
    <ul className='user-list'>
      {map(data, (person: any, key: string) => (
        <li key={key}>
          name: {person.firstName} {person.lastName} <br />
          phone: {person.phone} <br />
          <NavLink className="btn" to={'/person/' + person.id}>Edit</NavLink>
          <button className="btn" onClick={() => onDelete(person)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default connect(
  (state: any) => ({ state: state.app }),
  (dispatch) => ({
    onSort: (event: InputEvent) => dispatch({ type: 'SORT', payload: event.target.value }),
    onFilter: (event: InputEvent) => dispatch({ type: 'FILTER', payload: event.target.value }),
    onGetAll: () => dispatch({ type: 'GET_PEOPLE_ASYNC' }),
    onDeletePerson: (person: InputEvent) => dispatch({ type: 'DELETE_PERSON_ASYNC', payload: person })
  })
)(UserList);
