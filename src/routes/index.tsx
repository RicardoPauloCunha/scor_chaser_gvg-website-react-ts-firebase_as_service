import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import RegisterResultGvg from '../pages/RegisterResultGvg';
import RegisterGuild from '../pages/RegisterGuild';
import AcessKeys from '../pages/AcessKeys';
import ResultGvg from '../pages/ResultGvg';
import Concluded from '../pages/Concluded';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}></Route>
            <Route path="/result-gvg/register" component={RegisterResultGvg}></Route>
            <Route path="/guild" exact component={RegisterGuild}></Route>
            <Route path="/access-keys" exact component={AcessKeys}></Route>
            <Route path="/result-gvg" exact component={ResultGvg}></Route>
            <Route path="/concluded" exact component={Concluded}></Route>
        </BrowserRouter>
    );
}

export default Routes;