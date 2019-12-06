import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';

const AppRouter = () => (
    <BrowserRouter>
        <React.Fragment>
            <Header />
            <Switch>
                <Route path='/' component={Home} exact={true}/>
            </Switch>
            <Footer />
        </React.Fragment>
    </BrowserRouter>
);

export default AppRouter;