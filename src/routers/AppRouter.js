import React from 'react';
import { BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Privacy from '../components/Privacy';
import Terms from '../components/Terms';
import NoRoute from '../components/NoRoute';
import NewList from '../components/NewList';
import Login from '../components/Login';

const Router = ({location}) => (
    <React.Fragment>
        {location.pathname !== '/login' && <Header/> }
            <Switch>
                <Route path='/' component={Home} exact={true}/>
                <Route path='/privacy' component={Privacy}/>
                <Route path='/terms' component={Terms}/>
                <Route path='/l/new' component={NewList} exact={true}/>
                <Route path='/l/:id' component={NewList}/>
                <Route path='/login' component={Login} />
                <Route path='/reset' component=''/>
                <Route path='/signup' component=''/>
                <Route path='/' component={NoRoute}/>
            </Switch>
        <Footer />
        </React.Fragment>
);

const RouterWithHistory = withRouter(Router);

const AppRouter = () => (
    <BrowserRouter>
        <RouterWithHistory />
    </BrowserRouter>
);

export default AppRouter;   