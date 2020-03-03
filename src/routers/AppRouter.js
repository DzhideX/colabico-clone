import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Privacy from '../components/Privacy';
import Terms from '../components/Terms';
import NoRoute from '../components/NoRoute';
import NewList from '../components/NewList';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Reset from '../components/Reset';
import List from '../components/List';
import { connect } from 'react-redux';

const Router = ({ location, userId, dispatch }) => {
  useEffect(() => {
    dispatch({ type: 'REQUEST_USER_ID' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {location.pathname !== '/login' &&
        location.pathname !== '/signup' &&
        location.pathname !== '/reset' && <Header />}
      {userId &&
        (location.pathname === '/login' ||
          location.pathname === '/signup' ||
          location.pathname === '/reset') && <Header />}
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/l/new" component={NewList} exact={true} />
        <Route path="/l/:id" component={List} />
        {!userId && <Route path="/login" component={Login} />}
        {!userId && <Route path="/reset" component={Reset} />}
        {!userId && <Route path="/signup" component={Signup} />}
        <Route path="/" component={NoRoute} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.userId,
  todos: state.todos,
});

const RouterWithHistory = connect(mapStateToProps)(withRouter(Router));

const AppRouter = () => (
  <BrowserRouter>
    <RouterWithHistory />
  </BrowserRouter>
);

export default AppRouter;
