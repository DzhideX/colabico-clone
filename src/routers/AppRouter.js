import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
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
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';

const Router = ({location, userId, setUserId}) => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUserId(user.uid);
            } else {
              // No user is signed in.
            }
          });
    },[]);

    return (
        <React.Fragment>
            {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/reset' && <Header/> }
                <Switch>
                    <Route path='/' component={Home} exact={true}/>
                    <Route path='/privacy' component={Privacy}/>
                    <Route path='/terms' component={Terms}/>
                    <Route path='/l/new' component={NewList} exact={true}/>
                    <Route path='/l/:id' component={NewList}/>
                    <Route path='/login' component={Login} />
                    <Route path='/reset' component={Reset}/>
                    <Route path='/signup' component={Signup}/>
                    <Route path='/' component={NoRoute}/>
                </Switch>
            <Footer />
            </React.Fragment>
    );
}

const mapStateToProps = state => ({
    userId: state.userId,
    todos: state.todos
});

const mapDispatchToProps = dispatch => {
    return {
      setUserId: (userId) => dispatch({ type: 'SET_USER_ID', payload: { userId } }),
    }
  }

const RouterWithHistory = connect(mapStateToProps,mapDispatchToProps)(withRouter(Router));

const AppRouter = () => (
    <BrowserRouter>
        <RouterWithHistory />
    </BrowserRouter>
);

export default AppRouter;   