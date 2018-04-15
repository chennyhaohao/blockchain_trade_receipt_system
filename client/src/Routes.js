import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Issue from './components/Issue.js';
import Verify from './components/Verify.js';


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/issue" component={Issue} />
            <Route path="/verify" component={Verify} />
        </Switch>
    </BrowserRouter>
);

export default Routes;