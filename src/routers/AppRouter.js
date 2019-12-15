import React from 'react';
import { BrowserRouter, Route, Switch, withRouter, Router} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Privacy from '../components/Privacy';
import Terms from '../components/Terms';
import NoRoute from '../components/NoRoute';

const AppRouter = () => (
    <BrowserRouter>
        <React.Fragment>
            <Header />
            <Switch>
                <Route path='/' component={Home} exact={true}/>
                <Route path='/privacy' component={Privacy}/>
                <Route path='/terms' component={Terms}/>
                <Route path='/' component={NoRoute}/>
            </Switch>
            <Footer />
        </React.Fragment>
    </BrowserRouter>
);

export default AppRouter;   