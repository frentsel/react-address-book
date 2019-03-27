import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ReduxToastr from 'react-redux-toastr';

import './styles/App.scss';

import Loader from './parts/components/loader';
import UserList from './parts/pages/UserList';
import AddNew from './parts/pages/AddNew';
import User from './parts/pages/User';
import Home from './parts/pages/Home';

function App() {
  return (
    <Router>
      <header>
        <span>Address Book</span>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/userlist'>User List</Link>
          <Link to='/addNew/'>Add New</Link>
        </nav>
      </header>
      <Route exact path='/' component={Home} />
      <Route path='/userlist' component={UserList} />
      <Route path='/addNew' component={AddNew} />
      <Route path='/person/:id' component={User} />
      <footer>Alex Frentsel &copy; 2019</footer>
      <Loader />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick />
    </Router>
  )
}

export default App;