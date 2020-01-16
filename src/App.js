import React from 'react';
import './App.css';
import Students from './components/Students';
import StudentGraph from './components/StudentGraph';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import FilterDropdown from './components/FilterDropdown';

function App() {
  const isAuthenticated = useSelector(state => state.isAuthLoggedIn);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={`/`} component={() => isAuthenticated ? <Students /> : <Redirect to='/login' />} />
          <Route exact path={`/student/:id`} component={() => isAuthenticated ? <StudentGraph /> : <Redirect to='/login' />} />
          <Route exact path={`/login`} component={() => isAuthenticated ? <Redirect to='/' /> : <Login />} />
          <Route exact path={`/filterdropdown`} component={() => isAuthenticated ? <FilterDropdown /> : <Redirect to='/login' />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
