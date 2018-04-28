import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavigationComponent from './components/Navigation.js';

import Issue from './components/Issue.js';
import Verify from './components/Verify.js';

const NavigationWrapper = (Component) => (props) => {
    return (
        <div>
        	<NavigationComponent />
            <Component {...props} />
        </div>
    );
}

const Routes = (props) => { 
    //console.log(props);
    return ( //Behaves like a simple Component class
    <BrowserRouter>
        <Switch>
            <Route path="/issue" 
            	//render = {() => <Issue {...props} /> } />
            	render = {() => NavigationWrapper(Issue)(props) } />

            <Route path="/verify" render = {() => NavigationWrapper(Verify)(props)} />
        </Switch>
    </BrowserRouter>
);
}

export default Routes;