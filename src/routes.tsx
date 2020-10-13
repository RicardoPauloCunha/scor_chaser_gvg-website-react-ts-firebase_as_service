import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import LastGvg from './pages/LastGvg';
import Guild from './pages/Guild';
import AcessKeys from './pages/AcessKeys';
import ViewPoints from './pages/ViewPoints';
import Concluded from './pages/Concluded';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}></Route>
            <Route path="/last-gvg/register" component={LastGvg}></Route>
            <Route path="/guild" exact component={Guild}></Route>
            <Route path="/access-keys" exact component={AcessKeys}></Route>
            <Route path="/last-gvg" exact component={ViewPoints}></Route>
            <Route path="/concluded" exact component={Concluded}></Route>
        </BrowserRouter>
    );
}

export default Routes;